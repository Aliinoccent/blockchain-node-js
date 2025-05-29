const express =require("express");
const app=express();
const {createAccount,getAccount,transection,getBalance}=require('../controller/accounts')

app.post('/createAccount',createAccount);
app.get("/getAccount",getAccount)
app.post ('/transection',transection);
app.get('/balance',getBalance)
module.exports=app;