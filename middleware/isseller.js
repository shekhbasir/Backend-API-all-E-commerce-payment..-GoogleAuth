//here i am going to making the routes here if the the logged user is seller then only he can add the item in the sites 

const express=require('express');
const Userdatabase=require('../model/User');

const isseller=async(req,res,next)=>{
  try {
    const userid=req.userid;
    if(!userid){
      return res.status(400).json({message:"user id not found "})
    }

    const saradata=await Userdatabase.findById(userid);
   if (!saradata) {
      return res.status(404).json({ message: "User not found" });
    }

    const hamarrole=await saradata.role;
    if(saradata.role !== "seller"){
      return res.status(400).json({message:"you are Not valid for adding item ",hamarrole})
    }

    next();

  } catch (error) {
    return res.status(500).json({message:"error generating from isseller middleware"})
  }
}

module.exports=isseller;

//ab hamni jatani san sabb 