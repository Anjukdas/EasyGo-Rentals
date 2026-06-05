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