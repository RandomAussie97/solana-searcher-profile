# Selected research findings — November 2026

This disclosure-limited report summarizes measured internal research, not a trading performance claim. Raw capture archives and implementation details are retained privately. The example receipt linked below is public chain evidence; notification timing is an internal measurement and cannot be recovered from that receipt alone.

## Market activity and attribution

A 58.1-second passive observation of five candidate market baskets retained 493 signature-bearing log references. Forty selected finalized receipts were inspected; 35 were joined to watched vault updates using matching slot, reconciled token transfers and exact post-balances.

Eight receipts showed closed WSOL cycles on the exact monitored market pairs. Six had positive visible payer native-plus-WSOL balance changes. The largest reconciled example showed **40,704,964 lamports of DEX surplus and 8,421,811 lamports of visible payer gain**.

[Inspect the public example transaction](https://explorer.solana.com/tx/XxA9jBEj1wK1t94ERWNx9RV3iVNZJMjfWCfsBo2ManRTsbAuQhbFPJnsZoRK9K3MVd5dTgT8orDFTpCqWZUsaxi)

These are other operators' realized trades, not ours. Visible balance changes do not account for every possible operating expense. The selected receipts are not a representative sample, and the observed fills must not be extrapolated into profit or opportunity frequency estimates.

## Measured information and processing latency

| Measurement | Result | Scope |
| --- | ---: | --- |
| Processed vs confirmed account update delivery | 324.9 ms median lead | 501 quote-relevant exact-byte matches; 235 pool/slot combinations |
| Delivery lead range | 96.3–1,055.2 ms | Same local monotonic clock; correlated observations |
| Legacy notification-to-simulation transport | 197.3 ms median | Offline replay; fixed mock HTTP delay |
| Persistent notification-to-simulation transport | 136.4 ms median | Same two events, five runs per event per path; same 125 ms mock HTTP hold |
| Persistent live notification-to-bank launch | 0.815 ms | One event; full bank response at 172.181 ms; bank refused |

The first comparison measures delivery after account writes, not advance knowledge of a transaction. The second comparison isolates local software improvements, not live network or landing performance. The live bank was refused for inconsistent slot/Clock evidence; no simulation ran in that test.

## Negative controls and limitations

A subsequent opportunity-first study screened 1,430 retained quotes and 168 prospective quotes across supported market states and input sizes. All were negative after DEX fees. The prospective study captured six finalized account banks with retained block anchors. These quoted sizes are not independent trading opportunities. Finalized observations may miss short-lived spreads; execution parity and liquidity coverage remain restricted.

Previous unsigned simulations reached the existing public arbitrage program but did not demonstrate venue swaps or positive settlement. This is precisely why a successful RPC response is not treated as a successful trade.

## Why the sandbox matters

The current research demonstrates measurable signal delivery, repeatable offline evaluation, historical transaction attribution, and fail-closed admission. It does not establish a profitable strategy or pre-execution advantage. An authorized Harmonic pilot would let us measure whether permitted earlier signals and delivery feedback can close the evidence gap, without making profitability promises or enabling funded trading.

The [offline monitoring example](examples/market-monitor.cjs) contains five deterministic synthetic-fixture tests; it demonstrates the matching concept and does not reproduce the real measurements above.
