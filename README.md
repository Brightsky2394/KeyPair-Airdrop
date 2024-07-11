# Title: KeyPair and Airdrop

## Step taken are:

- Import solana web3 functionalities (i.e Connection, PublicKey, clusterApiUrl, Keypair and LAMPORTS_PER_SOL)
- Create new key pair
- Extract public and private key from the keypair
- Create Devnet connection
- Declare and initialize a getWalletBalance function
  This function enable the following:

  1. Creation of a new wallet called myWallet from the privateKey
     ```
         const myWallet = await Keypair.fromSecretKey(privateKey)
     ```
  2. Get the wallet balance
     ```
        const walletBalance = await connection.getBalance(
        new PublicKey(newPair.publicKey);
        )
     ```

  Code:

  ```
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
  ```

- Declare and initialize a function named "airDropSol" which does the following:

  1. Create a wallet from the private key
     Code:
     const myWallet = await Keypair.fromSecretKey(privateKey);
  2. Make an airdrop signature through connection request and then confirmed transaction
     Code:
     const fromAirDropSignature = await connection.requestAirdrop(
     new PublicKey(myWallet.publicKey),
     2 \* LAMPORTS_PER_SOL
     )
     await connection.confirmTransaction(fromAirDropSignature);

  Code:

  ```
    const airDropSol = async () => {
    try {
    const myWallet = await Keypair.fromSecretKey(privateKey);

                    // require for some airdrop to the wallet
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
  ```

- Declare and initialize mainFunction which display the wallet balance before and after airdropping of SOL
  code:
  ```
        async function mainFunction() {
        getWalletBalance();
        airDropSol();
        getWalletBalance();
        }
  ```

```
-  MainFunction is invoked or called

## Testing:

Run the command `node index.js` on the CLI(Command Line Interface) or Terminal to get the program results.

## Author:

Sikiru Yaya (skycode)
```
