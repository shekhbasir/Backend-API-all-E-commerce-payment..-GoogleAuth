const express=require("express");
const jwt=require("jsonwebtoken");

const tokengen=async(userid)=>{
  try {
    const token=jwt.sign({userid},process.env.SECRET_KEY,{expiresIn:"1d"});

    return token;

  } catch (error) {
   console.log("errror from the token generation ....");
  }
}




module.exports=tokengen;


//ok my signup operation will going to done 
