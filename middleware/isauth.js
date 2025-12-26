//here i am going to wrirnt the code for the isrout 
const jwt=require('jsonwebtoken');

const isauth=(req,res,next)=>{
  try {
    //here i am going to wrrintn the code for this 

    const hamartoken=req.cookies.token;

    if(!hamartoken){
      return res.status(401).json({message:" oii first login ....!"});
    }

    const decode=jwt.verify(hamartoken,process.env.SECRET_KEY);

    if(!decode){
      return res.status(400).json({message:"token not varify ...!"})
    }

    req.userid=decode.userid;
    next();


  } catch (error) {
    return res.status(500).json({message:"error from the isauth..!"});
    
  }
}

module.exports=isauth;

//now i am going to developin gthe controller for the user whoo is going to adding and working with this product and by the help this i am going to writing the co