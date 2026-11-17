'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { assessPaperCandidate } = require('./offline-risk-gate.cjs');

const candidate = {
  stateVerified: true,
  routeSupported: true,
  inputLamports: '1000000',
  outputAfterDexFeesLamports: '1010000',
  assumedNetworkFeeLamports: '5000',
  assumedAuctionBidLamports: '1000',
  failedAttemptAllowanceLamports: '3000',
  minimumSurplusLamports: '0',
};

test('illustrative positive paper surplus remains non-tradable', () => {
  const result = assessPaperCandidate(candidate);
  assert.equal(result.status, 'PAPER_PASSES_ASSUMED_COST_GATE');
  assert.equal(result.afterCostSurplusLamports, '1000');
  assert.equal(result.tradable, false);
  assert.equal(result.submissionEnabled, false);
});

test('paper case with excessive assumed costs is rejected', () => {
  const result = assessPaperCandidate({ ...candidate, failedAttemptAllowanceLamports: '9000' });
  assert.equal(result.status, 'PAPER_REJECTED');
});

test('missing state and unsupported routes fail closed', () => {
  assert.equal(assessPaperCandidate({ ...candidate, stateVerified: false }).status, 'REJECT_UNVERIFIED_ROUTE_OR_STATE');
  assert.equal(assessPaperCandidate({ ...candidate, routeSupported: false }).status, 'REJECT_UNVERIFIED_ROUTE_OR_STATE');
});

test('invalid unsigned inputs fail closed', () => {
  assert.throws(() => assessPaperCandidate({ ...candidate, assumedNetworkFeeLamports: '-1' }), /INVALID_NETWORK_FEE/);
  assert.throws(() => assessPaperCandidate({ ...candidate, inputLamports: '0' }), /ZERO_INPUT/);
});
