// middleware/admin.auth.middleware.js
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const adminAuth = async (req, res, next) => {
  let token = req.cookies.adminToken;

  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Admin login required to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.admin = admin;       // Whole admin object (without password)
    req.adminId = admin._id; // Optional shortcut for just the ID
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    return res.status(401).json({ message: "Invalid or expired admin token" });
  }
};

export default adminAuth;
