const web3 = require("@solana/web3.js");

const getWalletBalance = async (myWallet) => {
  try {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(
      new web3.PublicKey(myWallet.publicKey)
    );
    console.log(`=> For wallet address: Public Key- ${publicKey}`);
    console.log(
      `   Wallet balance: ${parseInt(walletBalance) / web3.LAMPORTS_PER_SOL} SOL`
    );
    return walletBalance;
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async (walletKeyPair) => {
  try {
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
    console.log(`Airdropping 2 SOL`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new web3.PublicKey(walletKeyPair.publicKey),
      2 * web3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

const transferSOL = async (fromKeypair, toKeypair, transferAmt) => {
  try {
    const transaction = new web3.Transaction();
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

    transaction.add(
      // web3.SystemProgram.transfer({
      //   fromPubkey: new web3.PublicKey(fromKeypair._keypair.publicKey).toString(),
      //   toPubkey: new web3.PublicKey(toKeypair._keypair.publicKey).toString(),
      //   lamports: transferAmt * web3.LAMPORTS_PER_SOL,
      // })
      web3.SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toKeypair.publicKey,
        lamports: transferAmt * web3.LAMPORTS_PER_SOL,
      })
    );
    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [
      fromKeypair,
    ]);
    return signature;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getWalletBalance, airDropSol, transferSOL };
