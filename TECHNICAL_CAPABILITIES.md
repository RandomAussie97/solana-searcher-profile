# Technical capabilities and scope

## 1. Read-only market observer — operating research service

- Observes permitted transaction data and tracks selected pool/vault state without a trading wallet.
- Links observed transaction signatures to publicly finalized transactions, identifies relevant writable pool interactions, and measures local processing/timing characteristics.
- Has verified genuine transaction observations. **This does not establish that they arrived before execution**, nor that a profitable backrun was available.
- No order signing, transaction submission, bundles or funded strategies are activated.

## 2. Offline arbitrage lab — research and testing

- Constructs and validates candidate multi-venue token routes and rejects incompatible pools or token flows.
- Evaluates supported finite-size swaps with exact integer arithmetic and venue-specific fee handling, where independently validated account/state inputs exist.
- Screens paper candidates against explicit capital, execution-fee, slippage and failure-risk assumptions; missing state and unsupported liquidity fail closed.
- Uses historical public Solana transactions and captured market-state fixtures for deterministic regression tests.
- Working areas include restricted Meteora DLMM and PumpSwap / Raydium pricing; Orca finite-size Whirlpool execution, complete historical-bank simulation and on-chain optimiser/CPI execution remain **unverified or incomplete**.
- Captured examples to date have **not** established repeatable executable after-cost profit for this project.

## 3. Intended pilot and compliance

Seek a limited, authorized sandbox assessment of early eligible signals, the available account/state dependencies, verified receipt-to-execution timing and the rules for an auction-based compliant backrun. We will not treat a read-only receipt or simulated profit as evidence of live execution capability.

This is a disclosure-limited overview. We intentionally do not publish credentials, operational endpoints, private research history, competitor-specific strategy, financial goals or implementation internals. The accompanying self-contained code is a **small illustrative subset of the kind of after-cost validation used in paper research**, not the original production implementation or proof of searcher profitability.
