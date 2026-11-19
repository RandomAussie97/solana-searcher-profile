# Technical capabilities and scope

Updated November 2026.

## 1. Read-only market observation

- Observes permitted transaction data and selected pool/vault state without a trading wallet.
- Correlates account updates with public finalized transaction receipts and reconciles token transfers and transaction ordering.
- Uses a persistent WebSocket/HTTPS research pipeline, immediate event dispatch and reusable unsigned transaction templates.
- In a short controlled observation, 501 exact quote-relevant processed/confirmed account-update matches had a median processed delivery lead of approximately 325 ms. This measures notification delivery, not pre-execution visibility.
- In an offline benchmark using identical retained events and mocked response delays, persistent transport reduced median notification-to-simulation-launch latency by approximately 61 ms. This is not a live execution or inclusion benchmark.

## 2. Offline arbitrage lab and simulation research

- Validates token eligibility, ordered account layouts, pool identities, dynamic tick/bin-array coverage and complete account-state evidence. Missing or inconsistent state and unsupported liquidity fail closed.
- Evaluates finite-size swaps using integer arithmetic and venue-specific fees where independently validated state and supported pricing implementations exist.
- Research covers restricted Meteora DLMM, PumpSwap and Raydium pricing and Orca route assembly/simulation. Full execution parity across venues and historical-bank reproduction remain incomplete or unverified.
- Reuses unsigned transaction templates for simulation of an existing public on-chain arbitrage program. Checks actual venue invocations and reconciled settlement rather than interpreting a successful RPC response as a profitable trade.
- Uses captured fixtures and public-chain data for deterministic regression tests, with bounded network and resource usage.
- Historical competitor fills have been independently reconciled. Our captured eligible states have not yet demonstrated a profitable executable spread; our unsigned simulations have not established successful swaps or after-cost profit.

## 3. Intended sandbox pilot

Seek a limited authorized evaluation of earlier eligible signals, complete market-state availability, signature-matched event attribution, execution/auction timing and conservative after-cost paper opportunities for compliant backrunning. Maintain strict rejection of unsupported or inconsistent state. Progress to any funded execution only after independent validation and applicable provider approval.

No active order signing, transaction submission, funded trading executor or demonstrated live profitability. No frontrunning or sandwich strategies.

## Disclosure

This is a disclosure-limited technical overview. Credentials, operational endpoints, private research history, competitor-specific strategy, financial goals and implementation internals are not published. The accompanying standalone risk-check example is illustrative, not production code or evidence of searcher profitability.
