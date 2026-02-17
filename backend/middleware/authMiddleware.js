const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if(!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Admin only
const verifyAdmin = (req, res, next) => {
  if(req.user.role !== "admin") return res.status(403).json({ msg: "Admin access only" });
  next();
};

module.exports = { verifyToken, verifyAdmin };
