import User from "../models/User.js";
import bcrypt from "bcryptjs";


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
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.json({
      message: "Role updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    await user.deleteOne();

    res.json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};