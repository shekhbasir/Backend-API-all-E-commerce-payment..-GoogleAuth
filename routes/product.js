

const express=require('express');
const allproduct=express.Router();
const {Hamaradd,Hamarupdate}=require('../controller/product');
const isseller=require('../middleware/isseller')
const isauth=require("../middleware/isauth")

allproduct.post("/addproduct",isauth,isseller,Hamaradd);
allproduct.put("/update/:id",isauth,isseller,Hamarupdate);

module.exports=allproduct;
