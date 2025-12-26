//here i am going to connecting the database 

const mongoose=require('mongoose');
const express=require('express');

const Hamarconnection=async()=>{
try {
  //here i am going to  writenn the  code for the connecting the 
  const kabhail=await mongoose.connect(process.env.MONGO_URL);
 console.log("MongoDb Connected Successfully ....!");
} catch (error) {
  console.log("feiled to connect the mongodb ...!");
}
}
module.exports=Hamarconnection;