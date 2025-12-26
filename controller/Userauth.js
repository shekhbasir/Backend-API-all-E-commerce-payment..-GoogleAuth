
const Userdatabase=require('../model/User');
const bcrypt=require('bcryptjs');
const tokengen=require("../config/token");


const Hamarsignup=async(req,res)=>{
  try {
    const {firstname,lastname,role,email,password}=req.body;

    const emailbaa=await Userdatabase.findOne({email});
    if(emailbaa){
      return res.status(400).json({message:"Email Id Already Exist..!"});
    }
    const Hashpassword=await bcrypt.hash(password,10);
    const newdata=await Userdatabase.create({
      firstname,
      lastname,
      role,
      email,
      password:Hashpassword
    });

    //after successfuly login  i want to generate the token 
    const token=await tokengen(newdata._id);

    res.cookie("token",token,{
      httpOnly:true,
      secure:false,
      samSite:"strict",
      maxAge:24*60*60*60*1000

    })

    return res.status(200).json({message:"Successfully Signup ....!",newdata,token});



  
   
  } catch (error) {
    return res.status(500).json({message:"errror from the Signup page "})
  }
}


const Hamarlogin=async(req,res)=>{
  try {
    //here 
    const {email,password}=req.body;

    const emailbaa=await Userdatabase.findOne({email});
    if(!emailbaa){
      return res.status(400).json({message:"email not found ..!"});
    }

    const checkpassword=await bcrypt.compare(password,emailbaa.password);

    if(!checkpassword){
      return res.status(400).json({message:"password not found ..!"});
    }

    const token=await tokengen(emailbaa._id);

    res.cookie("token",token,{
      httpOnly:true,
      secure:false,
      sameSite:"strict",
      maxAge:24*60*60*60*1000,

    })

    

    return res.status(200).json({message:"You Login Successfully ...!",token:token});
  } catch (error) {
    return res.status(500).json({message:"errror from the login page ..!"});
  }
}


const Hamarlogout=async(req,res)=>{
  try {

    // if(!req.cookies.token){
    //   return res.status(400).json({message:"first Login ...!"});
    // }
    res.clearCookie("token",{
      httpOnly:true,
      sameSite:"strict",

      secure:false
    })

    return res.status(200).json({message:"you logout successfully ...!"});
  } catch (error) {
    return res.status(500).json({message:"errror from the logout"})
  }
}
module.exports={Hamarsignup,Hamarlogin,Hamarlogout};