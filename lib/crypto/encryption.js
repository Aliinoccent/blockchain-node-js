var aes256 = require('aes256');
require("dotenv").config();
exports.encryption=async(plainText)=>{
    try {
        const encryptedData=aes256.encrypt(process.env.KEY,plainText);
        return encryptedData;
    } catch (error) {
        console.log(error);
    }
}
exports.decyptionVarify=async(encryptPrivatekey)=>{
    try {
        const decryptData=aes256.decrypt(process.env.KEY,encryptPrivatekey)
        return decryptData;
    } catch (error) {
        console.log(error);
    }
}