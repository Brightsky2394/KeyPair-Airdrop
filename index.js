// import solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Create new keypair
const newPair = new Keypair();

// Extract public and private key from keypair
const publicKey = new PublicKey(newPair._keypair.publicKey);
const privateKey = newPair._keypair.secretKey;

// Creata a connection to JSON RPC URL
const connection = new Connection("http://127.0.0.1:8899", "confirmed");

// Get wallet balance
async function getWalletBalance() {
    try {
        console.log(`Connection objec is `, connection);
        // Make a wallet from private key and get it's balance
        const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        )
        console.log(`Wallet balance: ${Number(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.error(err);
    }

}

const airDropSol = async () => {
    try {
        const myWallet = await Keypair.fromSecretKey(privateKey);
        // Request airdrop of 3 SOL to the wallet
        console.log(`Airdropping some SOL to my wallet`);
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(myWallet.publicKey), 3 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.error(err);
    }
}

// Display wallet balance before and after airdropping SOL
async function mainFunction() {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();