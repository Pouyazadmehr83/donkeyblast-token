# donkeyblast-token
Official $DBC Token - Solana SPL Token (Token-2022) with Metadata
# DonkeyBlast ($DBC) — Official Token Repository

![DonkeyBlast Banner](https://i.imgur.com/your-banner-image.jpg) <!-- جایگزین با لینک بنرت کن -->

> **The Funniest Meme Token on Solana**  
> DonkeyBlastCoin ($DBC) combines hilarious memes with real utility: complete tasks, earn rewards, and blast off to the moon! Built on Solana for speed, low fees, and scalability.  
> 
> **Total Supply:** 10,000,000,000 DBC (Fixed — No More Minting)  
> **Decimals:** 9  
> **Chain:** Solana (SPL Token-2022 with Metadata)  
> **Contract Address (Mainnet):** [Coming Soon — Watch This Space!]  
> **Devnet Test Address:** [8mrjdrdQtFomJUDEkEPJyTLVJHHn97pXghbhSyqvKzTJ](https://explorer.solana.com/address/8mrjdrdQtFomJUDEkEPJyTLVJHHn97pXghbhSyqvKzTJ?cluster=devnet)  
> 
> [Join Telegram](https://t.me/DonkeyBlastCoin) | [Follow on X](https://x.com/donkeyblastcoin) | [Website](https://donkeyblast.xyz)

---

## 🚀 Quick Start: How to Get Involved

1. **Buy $DBC (Presale):** Join our Telegram for presale details (1 SOL = 1,000,000 DBC).
2. **Earn Rewards:** Complete fun tasks in our community and claim pending $DBC after launch.
3. **Trade on DEX:** Post-launch on Raydium — LP coming soon!
4. **Airdrop:** 500M DBC for early supporters — check eligibility in Telegram.

**Pro Tip:** Add $DBC to your wallet (e.g., Phantom) using the mint address above for devnet testing.

---

## 📊 Tokenomics

Fixed supply with fair distribution — no VC dumps, community first!

| Allocation | Amount (DBC) | Percentage | Description |
|------------|--------------|------------|-------------|
| **Public Presale** | 6,500,000,000 | 65% | Open to all — fixed rate, early access. |
| **Liquidity Pool** | 1,500,000,000 | 15% | Locked on Raydium for smooth trading. |
| **Marketing & Partnerships** | 1,000,000,000 | 10% | Influencers, ads, collabs (vested 6 months). |
| **Team & Development** | 500,000,000 | 5% | Core team — vested 12 months for long-term growth. |
| **Airdrop** | 500,000,000 | 5% | Multi-phase drops for community heroes. |

**Presale Details:**
- **Rate:** 1 SOL = 1,000,000 DBC (~$0.0002 per DBC)
- **Min/Max:** 0.2 SOL / 20 SOL per wallet
- **Fund Allocation:** 30% Dev, 25% Marketing, 20% Ops, 15% LP, 10% Reserve

![Tokenomics Chart](tokenomics.png) <!-- آپلود تصویر چارت کن -->

**Vesting:** Team/Marketing tokens locked via Team Finance — no rugs!

---

## 🗺️ Roadmap

| Phase | Timeline | Milestones |
|-------|----------|------------|
| **Phase 1: Foundation** | Q4 2025 | Token creation (Token-2022), website launch, Phase 1 airdrop (125M DBC), whitepaper. |
| **Phase 2: Community Build** | Q1 2026 | Presale live, multi-phase airdrops, Telegram/X growth, influencer partnerships. |
| **Phase 3: Liquidity & Listings** | Q2 2026 | Raydium LP, public trading, staking launch, CMC/CG submissions. |
| **Phase 4: Ecosystem** | Q3-Q4 2026 | NFT drops, DonkeyBlast GameFi, DAO voting, wallet integration. |
| **Phase 5: Global Expansion** | 2027+ | CEX listings (Binance?), MENA/Asia focus, sustainability fund. |

**One-Liner:** Launch → Community → Trade → Utility → Moon!

---

## 🔧 Technical Details

### Token Metadata
See [metadata.json](metadata.json) for full spec:
- **Name:** DonkeyBlast
- **Symbol:** $DBC
- **Image:** [DonkeyBlast Logo](https://i.imgur.com/your-logo.jpg)
- **Description:** "Meme magic meets Solana speed — earn $DBC by blasting donkeys!"
- **External URL:** [donkeyblast.xyz](https://donkeyblast.xyz)

### Smart Contract
- **Program:** Token-2022 (TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb)
- **Audited:** Verified on Solscan — fully transparent.
- **Source Code:** [src/createDonkeyBlast.ts](src/createDonkeyBlast.ts) — Replicate the deployment yourself!

### Deployment Script
To create your own $DBC (devnet test):
```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Create Token-2022
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --enable-metadata --decimals 9

# Mint Supply
spl-token mint <MINT_ADDRESS> 10000000000

# Add Metadata
spl-token initialize-metadata <MINT_ADDRESS> "DonkeyBlast" "DBC" "https://raw.githubusercontent.com/Pouyazadmehr83/donkeyblast-token/main/metadata.json"

# Revoke Mint (Fixed Supply)
spl-token authorize <MINT_ADDRESS> mint --disable
