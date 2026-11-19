'use strict';
// Offline, illustrative account-update correlation. No RPC, keys or trading.
// The adapter must stamp receiptNs from ONE local monotonic clock.
const { createHash } = require('node:crypto');

function createMonitor(watchedAccounts, maxEntries = 1024) {
  const watched = new Set(watchedAccounts);
  if (!Number.isSafeInteger(maxEntries) || maxEntries < 1) throw Error('INVALID_LIMIT');
  const entries = new Map();

  function ingest(event) {
    if (!event || !watched.has(event.account)) return null;
    const { account, slot, commitment, dataBase64, receiptNs } = event;
    if (!Number.isSafeInteger(slot) || slot < 0 ||
        !['processed', 'confirmed'].includes(commitment) ||
        typeof dataBase64 !== 'string' || dataBase64.length > 131072 ||
        typeof receiptNs !== 'string' || !/^(0|[1-9][0-9]*)$/.test(receiptNs)) {
      throw Error('INVALID_EVENT');
    }
    const bytes = Buffer.from(dataBase64, 'base64');
    if (bytes.toString('base64') !== dataBase64) throw Error('INVALID_BASE64');
    const digest = createHash('sha256').update(bytes).digest('hex');
    const key = JSON.stringify([account, slot, digest]);
    let pair = entries.get(key);
    if (!pair) {
      if (entries.size >= maxEntries) entries.delete(entries.keys().next().value);
      pair = {};
      entries.set(key, pair);
    }
    // First receipt per commitment. Retain completed pairs to suppress duplicates
    // until bounded FIFO eviction; deduplication is not guaranteed after eviction.
    if (pair[commitment] !== undefined) return null;
    pair[commitment] = BigInt(receiptNs);
    if (pair.processed === undefined || pair.confirmed === undefined) return null;
    return Object.freeze({ account, slot, digest,
      confirmedMinusProcessedNs: (pair.confirmed - pair.processed).toString(),
      classification: 'MATCHED_DELIVERY_ONLY', tradable: false });
  }
  return Object.freeze({ ingest, size: () => entries.size });
}

module.exports = { createMonitor };

if (require.main === module) {
  const test = require('node:test');
  const assert = require('node:assert/strict');
  // Synthetic fixtures, NOT recorded market data or measured performance.
  const event = (fields = {}) => ({ account: 'demo-vault', slot: 100,
    commitment: 'processed', dataBase64: 'AQID', receiptNs: '1000000', ...fields });
  test('exact match measures signed delivery interval, never trade eligibility', () => {
    const m = createMonitor(['demo-vault']);
    assert.equal(m.ingest(event()), null);
    const match = m.ingest(event({ commitment: 'confirmed', receiptNs: '326000000' }));
    assert.equal(match.confirmedMinusProcessedNs, '325000000');
    assert.equal(match.tradable, false);
    assert.equal(m.ingest(event({ commitment: 'confirmed' })), null);
  });
  test('different bytes, slots and unwatched accounts cannot match', () => {
    const m = createMonitor(['demo-vault']);
    m.ingest(event());
    for (const change of [{ dataBase64: 'AQIE' }, { slot: 101 }, { account: 'other' }]) {
      assert.equal(m.ingest(event({ commitment: 'confirmed', ...change })), null);
    }
  });
  test('confirmed-first delivery is retained with a negative lead', () => {
    const m = createMonitor(['demo-vault']);
    m.ingest(event({ commitment: 'confirmed', receiptNs: '1' }));
    assert.equal(m.ingest(event({ receiptNs: '2' })).confirmedMinusProcessedNs, '-1');
  });
  test('invalid encoding and timestamps fail closed', () => {
    const m = createMonitor(['demo-vault']);
    assert.throws(() => m.ingest(event({ dataBase64: 'AQID!' })), /INVALID_BASE64/);
    assert.throws(() => m.ingest(event({ receiptNs: '-1' })), /INVALID_EVENT/);
  });
  test('bounded storage evicts the oldest pair', () => {
    const m = createMonitor(['demo-vault'], 1);
    m.ingest(event());
    m.ingest(event({ slot: 101 }));
    assert.equal(m.size(), 1);
    assert.equal(m.ingest(event({ commitment: 'confirmed' })), null);
  });
}
