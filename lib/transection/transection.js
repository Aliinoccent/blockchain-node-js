require('dotenv').config();
const { Web3 } = require("web3");
const web3 = new Web3(process.env.RPC_URL);
const {decyptionVarify}=require('../crypto/encryption')
const TransectionProcedure = async (senderPrivateKey, reciver) => {
    const gasPrice = await web3.eth.getGasPrice();
    const verifyPrivateKey = await decyptionVarify(senderPrivateKey);
    console.log(verifyPrivateKey);
    const sender = web3.eth.accounts.privateKeyToAccount(verifyPrivateKey);
    const nonce = await web3.eth.getTransactionCount(sender.address, 'latest');
    const value = web3.utils.toWei("0.01", 'ether');
   

    const data = {
        from: sender.address,
        to: reciver,
        value: value,
        gasPrice: gasPrice,
        nonce: nonce,
        gas: 21000,
    }

    const signedTx = await sender.signTransaction(data);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
}
module.exports = { TransectionProcedure }