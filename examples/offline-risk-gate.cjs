'use strict';
// Safe, standalone example of an AFTER-COST PAPER gate.
// No RPC, secrets, keys, order generation, wallets or transaction sending.
// Outputs are supplied by a separate, independently verified route-pricing engine.

function nonnegativeLamports(value, name) {
  if (typeof value !== 'string' || !/^(0|[1-9][0-9]*)$/.test(value)) {
    throw new Error('INVALID_' + name);
  }
  return BigInt(value);
}

function assessPaperCandidate(candidate) {
  if (!candidate || candidate.stateVerified !== true || candidate.routeSupported !== true) {
    return Object.freeze({ status: 'REJECT_UNVERIFIED_ROUTE_OR_STATE', tradable: false });
  }

  const input = nonnegativeLamports(candidate.inputLamports, 'INPUT');
  const output = nonnegativeLamports(candidate.outputAfterDexFeesLamports, 'OUTPUT');
  const network = nonnegativeLamports(candidate.assumedNetworkFeeLamports, 'NETWORK_FEE');
  const bid = nonnegativeLamports(candidate.assumedAuctionBidLamports, 'AUCTION_BID');
  const failures = nonnegativeLamports(candidate.failedAttemptAllowanceLamports, 'FAILURE_ALLOWANCE');
  const minProfit = nonnegativeLamports(candidate.minimumSurplusLamports, 'MIN_SURPLUS');

  if (input === 0n) throw new Error('ZERO_INPUT');

  // DEX fees are ALREADY reflected in output; do not subtract them again.
  // Allowances are declared assumptions, not observed future transaction costs.
  const afterCosts = output - input - network - bid - failures;
  return Object.freeze({
    status: afterCosts > minProfit ? 'PAPER_PASSES_ASSUMED_COST_GATE' : 'PAPER_REJECTED',
    afterCostSurplusLamports: afterCosts.toString(),
    tradable: false,
    submissionEnabled: false,
  });
}

module.exports = { assessPaperCandidate };
