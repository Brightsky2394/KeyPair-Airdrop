// import solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// create new keypair
const newPair = new Keypair();

// Extract public and private key from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

// create Devnet connection
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log(`Public key of generated keyPair: `, publicKey);

// get wallet balance from private key
const getWalletBalance = async () => {
    try {
        console.log(`Connection object is :`, connection);

        // Make wallet from private key and get its balance
        const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(newPair.publicKey)
        )
        console.log(`Wallet Balance: ${Number(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.error(err);
    }

}

// Airdrop function
const airDropSol = async () => {
    try {
        const myWallet = await Keypair.fromSecretKey(privateKey);

        // request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(myWallet.publicKey),
            2 * LAMPORTS_PER_SOL
        )
        await connection.confirmTransaction(fromAirDropSignature);

    } catch (err) {
        console.error(err);
    }
}


// Display wallet balance before and after airdropping SOL
async function mainFunction() {
    getWalletBalance();
    airDropSol();
    getWalletBalance();
}

// Invoke or call the mainFunction
mainFunction();
 