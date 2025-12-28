
const express=require('express');
const allauthroutes=express.Router();
const {Hamarsignup,Hamarlogin,Hamarlogout}=require('../controller/Userauth');
const isauth=require('../middleware/isauth');
const {updateProfile} =require("../controller/profile");
const upload=require("../middleware/upload");

allauthroutes.post("/signup",Hamarsignup);
allauthroutes.post("/login",Hamarlogin);
allauthroutes.get("/logout",isauth,Hamarlogout);
allauthroutes.put(
  "/profileupdate",
  isauth,
  upload.single("profileImage"),
  updateProfile
);


module.exports=allauthroutes;