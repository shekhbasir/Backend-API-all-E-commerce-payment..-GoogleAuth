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


//here i am going to making the api when i heat then

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

module.exports={Hamaradd,Hamarupdate};
//now going to making this 
