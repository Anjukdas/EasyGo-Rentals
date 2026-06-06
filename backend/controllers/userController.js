import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProfile = async (req, res) => {
  try {
    // Middleware mumbu thanne req.user set cheythittund
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Direct response ayakkam, double database query ozhivakam
    res.json(req.user); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update_profile = async(req,res) => {
  console.log(req.body);
console.log(req.file);
  try {
      const userId = req.user.id;

      const updatedData = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      };

      if (req.file) {
        updatedData.profilePic =
          `http://localhost:5000/uploads/${req.file.filename}`;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}