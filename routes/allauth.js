
const express=require('express');
const allauthroutes=express.Router();
const {Hamarsignup,Hamarlogin,Hamarlogout}=require('../controller/Userauth');
const isauth=require('../middleware/isauth');

allauthroutes.post("/signup",Hamarsignup);
allauthroutes.post("/login",Hamarlogin);
allauthroutes.get("/logout",isauth,Hamarlogout);

module.exports=allauthroutes;