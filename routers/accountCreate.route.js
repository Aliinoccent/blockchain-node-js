const express =require("express");
const app=express();
const {createAccount}=require('../controller/accounts')

app.post('/createAccount',createAccount);
module.exports=app;