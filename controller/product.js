//here i am goig to making the api for all the product related jobs 
const mongoose=require("mongoose")
const ProductDatabase=require("../model/product")
const Hamaradd=async(req,res)=>{
  try {
    const {name,description,price,discountprice,discountpercentage,catogery,brand,stock,photo,rating,review,reviewcount}=req.body;
    //by the help of this it will going to handle all the things 
    
    const sabdata=await ProductDatabase.create({
      name,description,price,discountprice,discountpercentage,catogery,brand,stock,photo,rating ,review,reviewcount
    });

    return res.status(200).json({message:"Data added To makemysite ...!",sabdata})
    

  } catch (error) {
    return res.status(500).json({message:"error from the add your product ...!"});
  }
}



const Hamarupdate = async (req, res) => {
  try {
    const updateid = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(updateid)) {
      return res.status(400).json({
        message: "Invalid product id"
      });
    }

    const updatebhail = await ProductDatabase.findByIdAndUpdate(
      updateid,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatebhail) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Successfully Updated",
      product: updatebhail
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error.message);
    return res.status(500).json({
      message: "error from the update data"
    });
  }
};


const Hamardelete=async(req,res)=>{
  try {
    const hamarid=req.params.id;

    const deleting=await ProductDatabase.findByIdAndDelete(hamarid);

    if(!deleting){
      return res.status(400).json({message:"data not found for deleting ...!"});
    }

     return res.status(200).json({message:"data deleted succesfully ...!"});
  } catch (error) {
     return res.status(500).json({message:"error will generated from the deleting task "});
  }
}
//here i am going to wrintg the code for finding the all data 

const Hamarsabdata=async(req,res)=>{
  try {
    const alldata=await ProductDatabase.find();
    if(alldata.length===0){
      return res.status(400).json({message:"no data will going to find ...!"});
    }

    return res.status(200).json({message:"Your All Data ",alldata});
  } catch (error) {
    return res.status(500).json({message:"error from the finding all data "})
  }
}


//here i am going to wrintg the code for the geting single product 
const Hamarsingle=async(req,res)=>{
  try {
    const hamarid=req.params.id;
    if(!hamarid){
      return res.status(400).json({message:"id not Found ...!"});
    }

    const singledata=await ProductDatabase.findById(hamarid);

    return res.status(200).json({message:"your details ",singledata})
  } catch (error) {
    return res.status(500).json({message:"errror from the singlevalue "})
  }

}
module.exports={Hamaradd,Hamarupdate,Hamardelete,Hamarsabdata,Hamarsingle};
