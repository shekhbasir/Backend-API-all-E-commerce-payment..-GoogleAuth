const profiledatabase=require("../model/profile");
const updateProfile = async (req, res) => {
  try {
    const userId = req.userid;

    const { name, phone, bio } = req.body;

    const user = await profiledatabase.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      user.profileimg = req.file.path;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);
    return res.status(500).json({
      message: "Error updating profile",
      error: error.message
    });
  }
};


module.exports={updateProfile}