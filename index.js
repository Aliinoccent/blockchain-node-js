const express=require('express');
const app=express();
app.use(express.json());
const allTables=require("./model/account");
allTables();
const router=require('./routers/accountCreate.route')
app.use('/',router)
app.listen(3000);
