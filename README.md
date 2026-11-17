# Solana Searcher — Technical Profile

Independent Solana research project developing **non-sandwich, atomic cross-DEX arbitrage** and compliant backrunning.

**Existing research components**
- **Read-only observer:** deployed on Railway for transaction/pool monitoring and public-chain attribution. It does not sign or submit trades.
- **Arbitrage research lab:** offline route checks, finite-size pricing for supported venues, fee-aware paper evaluation and regression tests using public Solana data.

We are investigating execution-time route selection and testing whether relevant transaction information arrives with enough lead time to act. **We have not deployed a live trading executor or demonstrated profitable live execution.**

**Harmonic sandbox objective:** evaluate permitted pre-execution signals, complete pool-state availability, execution/auction timing, and conservative after-cost paper opportunities before any funded trading.

We do not develop sandwiching or frontrunning strategies and would follow the provider's onboarding, identity and compliance requirements.

See [technical capabilities](TECHNICAL_CAPABILITIES.md) and a small [offline risk-check example](examples/offline-risk-gate.cjs). The example is not our full internal bot and cannot trade.
