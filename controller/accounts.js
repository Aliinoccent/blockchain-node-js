const pool=require("../config/db");
require('dotenv').config();
const {Web3}=require("web3");
exports.createAccount=async(req,res)=>{
    try {
    const web3=new Web3(process.env.RPC_URL);
      const account = web3.eth.accounts.create();
    
       const saveAccount= await pool.query('insert into account (address,private_key) values($1,$2) returning *',[account.address,account.privateKey]);
       res.status(200).json({message:saveAccount});

    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}