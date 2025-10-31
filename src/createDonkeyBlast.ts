import { Connection, Keypair, clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  setAuthority,
  AuthorityType,
  transfer,
} from "@solana/spl-token";
import {
  Metaplex,
  keypairIdentity,
    irysStorage,
} from "@metaplex-foundation/js";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// ========== تنظیمات ==========
const NETWORK = "devnet"; // برای تست | برای لانچ واقعی: "mainnet-beta"
const connection = new Connection(clusterApiUrl(NETWORK), "confirmed");

// مسیر والت (معمولاً همین است)
const WALLET_PATH = path.join(require("os").homedir(), ".config", "solana", "id.json");
if (!fs.existsSync(WALLET_PATH)) {
  console.error("والت پیدا نشد! مسیر:", WALLET_PATH);
  process.exit(1);
}
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(WALLET_PATH, "utf8")));
const wallet = Keypair.fromSecretKey(secretKey);

console.log("Wallet:", wallet.publicKey.toBase58());

// ========== متادیتا (اینجا ویرایش کن) ==========
const METADATA = {
  name: "DonkeyBlast",
  symbol: "DBC",
  description: "The funniest meme token on Solana. Complete tasks, earn $DBC, and join the blast!",
  image: "https://imgur.com/a/kizMIwI", // ← لینک Imgur خودت رو اینجا بذار
  external_url: "https://donkeyblast.xyz",
  attributes: [
    { trait_type: "Type", value: "Meme Token" },
    { trait_type: "Chain", value: "Solana" },
  ],
  properties: {
    files: [{ uri: "https://i.imgur.com/XyZ123a.jpg", type: "image/jpeg" }],
    category: "image",
  },
};

// ========== تابع اصلی ==========
async function createDonkeyBlastToken() {
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
     // بعد (درست):
    .use(irysStorage());

  // 1. ساخت مینت
  const mint = await createMint(
    connection,
    wallet,
    wallet.publicKey,
    null,
    9
  );
  console.log("Mint address:", mint.toBase58());

  // 2. ساخت ATA
  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    wallet.publicKey
  );
  console.log("ATA address:", ata.address.toBase58());

  // 3. مینت 10 میلیارد
  const totalSupply = BigInt(10_000_000_000) * (10n ** 9n);
  await mintTo(
    connection,
    wallet,
    mint,
    ata.address,
    wallet.publicKey,
    totalSupply
  );
  console.log("Minted 10,000,000,000 DBC");

  // 4. آپلود متادیتا
  const { uri } = await metaplex.nfts().uploadMetadata(METADATA);
  console.log("Metadata URI:", uri);

  // 5. اضافه کردن متادیتا
  await metaplex.nfts().create({
    uri,
    name: METADATA.name,
    symbol: METADATA.symbol,
    sellerFeeBasisPoints: 0,
    creators: [{ address: wallet.publicKey, share: 100 }],
    isMutable: false,
    updateAuthority: wallet,
    mintAuthority: wallet,
    tokenOwner: wallet.publicKey,
  });

  console.log("Metadata added!");

  // 6. غیرفعال کردن مینت
  await setAuthority(
    connection,
    wallet,
    mint,
    wallet.publicKey,
    AuthorityType.MintTokens,
    null
  );
  console.log("Mint authority revoked");

  // ========== خروجی نهایی ==========
  console.log("\nDonkeyBlast ($DBC) آماده است!");
  console.log(`Mint: ${mint.toBase58()}`);
  console.log(`Explorer: https://explorer.solana.com/address/${mint.toBase58()}?cluster=${NETWORK}`);
}

// ========== اجرا ==========
createDonkeyBlastToken().catch(err => {
  console.error("خطا:", err.logs || err.message || err);
});