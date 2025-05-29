const pool = require("../config/db");
require('dotenv').config();
const { Web3} = require("web3");
const web3 = new Web3(process.env.RPC_URL);
const {encryption}=require('../lib/crypto/encryption');
const {TransectionProcedure}=require("../lib/transection/transection")
 
exports.createAccount = async (req, res) => {
    try {

        const account = web3.eth.accounts.create();
        const encryptPrivateKey=await encryption(account.privateKey);
        console.log(account.privateKey,encryptPrivateKey);
        const saveAccount = await pool.query('insert into account (address,private_key) values($1,$2) returning *', [account.address, encryptPrivateKey]);
        res.status(200).json({ message: saveAccount });
     

    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}
exports.getAccount = async (req, res) => {
    try {
        const acconts = await pool.query('select * from account ');
        if (!acconts.rowCount) {
            return res.status(404).json({ message: "list empty" });
        }
        return res.status(200).json({ acconts: acconts.rows });

    } catch (error) {
        console.log({ error })
        return res.status(500).json({ error });
    }
}
exports.transection = async (req, res) => {
    const { reciver, senderPrivateKey } = req.body;
    try {
        if (!reciver || !senderPrivateKey) {
            return res.status(404).json({ messeege: "all field require" })
        }
      
        const Transection = await TransectionProcedure(senderPrivateKey, reciver);
        console.log(Transection);
        if (!Transection) {
            return res.status(400).json({ messege: "transection not procedure" });
        }

        const reciverBalance = await web3.eth.getBalance(reciver);
        // const sender= web3.eth.accounts.privateKeyToAccount(senderPrivateKey);
        // const senderBalance = await web3.eth.getBalance(sender.address);
        // console.log("senderBalance :",senderBalance ,"\n","reciver balnace :",reciverBalance );
        return res.status(200).json({ messege: "transection successfull" });
    } catch (error) {
        console.log({ error })
        return res.status(500).json({ error });
    }
}
exports.getBalance=async(req,res)=>{
    const {address}=req.body;
   
    console.log(address);
    try {
        if(!address){
            res.status(404).json({message:'requred filed'});
        }
      const balance= await  web3.eth.getBalance(address);
      const ethBalance= web3.utils.fromWei(balance ,'ether')
      console.log(balance,"blance","eth balocn",ethBalance)
      res.status(200).json({balanceWie :balance.toString(), EThBalnce:ethBalance.toString()});
    
    } catch (error) {
        console.log(error)
        return res.json({error})
        
    }
}



