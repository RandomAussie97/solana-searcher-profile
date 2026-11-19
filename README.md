# Solana Searcher — Technical Profile

Independent Solana research project developing **non-sandwich, atomic cross-DEX arbitrage** and compliant backrunning.

## Current development — November 2026

- **Market observation:** read-only transaction and pool monitoring, signature attribution to finalized receipts, and measured processed-versus-confirmed notification timing.
- **Research pipeline:** persistent WebSocket/HTTPS transport, immediate event dispatch, complete account-state validation, dynamic liquidity-array checks, and reusable unsigned transaction templates.
- **Arbitrage evaluation:** finite-size integer pricing for supported market types, historical state replay, fee-aware paper screening, and deterministic regression tests.
- **Execution research:** unsigned simulations of an existing public on-chain arbitrage program across supported cross-DEX routes; actual venue swaps and reconciled settlement are required before claiming a successful trade.

We have verified genuine profitable historical arbitrage by other operators. Our own research has not yet demonstrated a profitable simulated or live execution. No funded trading executor is deployed.

## Harmonic sandbox objective

We seek authorized sandbox access to evaluate permitted earlier orderflow, integrate transaction-signature and pool-state attribution, measure signal-to-execution timing, and validate conservative after-cost opportunities under Harmonic's searcher and auction requirements.

Our research indicates that standard post-execution RPC notifications may miss short-lived opportunities. The sandbox would help us evaluate an earlier, compliant backrun workflow rather than assume faster data guarantees profitability.

We do not develop sandwiching or frontrunning strategies and would follow provider onboarding, identity and compliance requirements.

See [technical capabilities](TECHNICAL_CAPABILITIES.md) and our [standalone offline paper-risk example](examples/offline-risk-gate.cjs). The example is illustrative, is not the full internal implementation, and cannot trade.
