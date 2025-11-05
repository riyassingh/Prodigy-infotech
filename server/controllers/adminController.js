// controllers/adminController.js

import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";

// Generate JWT
const generateAdminToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sendAdminVerificationEmail = async (admin) => {
  const token = jwt.sign({ id: admin._id }, process.env.EMAIL_SECRET, { expiresIn: "1d" });
  const verificationLink = `${process.env.CLIENT_URL}/admin/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: admin.email,
    subject: "Admin Account Verification",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your admin account.</p>`,
  });

  return token;
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("➡️ Incoming request body:", req.body);

    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("❌ Admin already exists");
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // ⚠️ Directly saving the password as plain text
    const admin = new Admin({ name, email, password });

    // Skip pre-save hooks like hashing
    await admin.save({ validateBeforeSave: true });

    console.log("✅ Admin saved without hashing:", admin);

    const emailToken = await sendAdminVerificationEmail(admin);
    console.log("📧 Verification token generated:", emailToken);

    res.status(201).json({
      message: "Admin registered. Verification email sent.",
      verificationToken: emailToken,
    });

  } catch (error) {
    console.error("🔥 Admin registration failed:", error.message, error.stack);
    res.status(500).json({ message: "Server error" });
  }
};

  

// Admin Login
// controllers/adminController.js

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Login Attempt:", req.body);

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");
    if (!admin) {
      console.log("❌ Admin not found for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = admin.generateToken();
    console.log(token);
    

    // Secure and cookie options
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use true only in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // optional: 7 days
    });

    console.log("✅ Admin login successful");

    res.status(200).json({
      message: "Admin logged in successfully",
      admin: {
        name: admin.name,
        email: admin.email,
        permissions: admin.permissions,
      },
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const verifyAdminEmail = async (req, res) => {
    try {
      const { token } = req.params;
  
      const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
      const admin = await Admin.findById(decoded.id);
  
      if (!admin) return res.status(404).json({ message: "Admin not found" });
  
      if (admin.isVerified) {
        return res.status(400).json({ message: "Admin already verified" });
      }
  
      admin.isVerified = true;
      await admin.save();
  
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Email verification failed:", error);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  };
  

// Admin Logout
export const logoutAdmin = (req, res) => {
  try {
    res.cookie("adminToken", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Admin logged out" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};

// Get Current Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const { password, ...admin } = req.admin._doc;
    res.status(200).json(admin);
  } catch (err) {
    console.error("Failed to get admin profile:", err);
    res.status(500).json({ message: "Failed to retrieve admin data" });
  }
};

// Upload Admin Avatar
export const uploadAdminAvatar = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id); // ✅ Correct way to access ID

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Delete old avatar if it exists
    if (admin.avatar?.public_id) {
      await cloudinary.uploader.destroy(admin.avatar.public_id);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "admin_avatars",
      width: 300,
      crop: "scale",
    });

    // Save new avatar
    admin.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await admin.save();

    res.status(200).json({
      message: "Avatar uploaded and saved successfully",
      avatar: admin.avatar,
    });
  } catch (error) {
    console.error("Avatar upload error:", error);
    res.status(500).json({ message: "Avatar upload failed" });
  }
};
// Remove Admin Avatar
export const removeAdminAvatar = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin || !admin.avatar?.public_id) {
      return res.status(404).json({ message: "No avatar to delete" });
    }

    await cloudinary.uploader.destroy(admin.avatar.public_id);
    admin.avatar = undefined;
    await admin.save();

    res.status(200).json({ message: "Avatar removed successfully" });
  } catch (err) {
    console.error("Failed to remove avatar:", err);
    res.status(500).json({ message: "Failed to remove avatar" });
  }
};

// Update Admin Profile




export const sendAdminResetOTP = async (req, res) => {
    const { email } = req.body;
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(404).json({ message: "Admin not found" });
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      // Hash OTP before storing
      const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
      admin.resetPasswordOTP = hashedOtp;
      admin.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 mins
  
      await admin.save();
  
      await sendEmail({
        to: email,
        subject: "Your Admin Password Reset OTP",
        text: `Your OTP for password reset is: ${otp}`,
      });
  
      res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send OTP", error });
    }
  };



  export const verifyAdminOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(404).json({ message: "Admin not found" });
  
      const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  
      if (
        admin.resetPasswordOTP !== hashedOtp ||
        admin.resetOTPExpire < Date.now()
      ) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
  
      admin.resetPasswordOTP = undefined;
      admin.resetOTPExpire = undefined;
      admin.isVerifiedForReset = true;
      await admin.save();
  
      res.status(200).json({ message: "OTP verified" });
    } catch (error) {
      res.status(500).json({ message: "OTP verification failed", error });
    }
  };
  

  export const resetAdminPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin || !admin.isVerifiedForReset)
        return res.status(400).json({ message: "Unauthorized or invalid request" });
  
      admin.password = newPassword;
      admin.isVerifiedForReset = false;
      await admin.save();
  
      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      res.status(500).json({ message: "Password reset failed", error });
    }
  };
  

  export const updateAdminDetails = async (req, res) => {
    try {
      const adminId = req.admin?._id;
  
      if (!adminId) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      const { name, email, phone, gender,address } = req.body;
      console.log("Request Body:", req.body);
  
      const admin = await Admin.findById(adminId);
      if (!admin) return res.status(404).json({ message: "Admin not found" });
  
      let emailUpdated = false;
  
      if (name) admin.name = name;
      if (phone) {
        console.log("Updating phone to:", phone);
        admin.phone = phone;
      }
      if (gender !== undefined) {
        admin.gender = gender;
      }
  
      if (email && email !== admin.email) {
        admin.email = email;
        admin.isVerified = false;
        emailUpdated = true;
      }
  
      if (address && typeof address === "object") {
        admin.address = {
          addressLine: address.addressLine || admin.address.addressLine || "",
          city: address.city || admin.address.city || "",
          state: address.state || admin.address.state || "",
          country: address.country || admin.address.country || "",
          pincode: address.pincode || admin.address.pincode || "",
        };
      }
  
      await admin.save();
      console.log("Saved admin:", admin);
  
      res.status(200).json({
        message: emailUpdated
          ? "Email updated. Please verify your new email."
          : "Admin profile updated successfully",
        isVerified: admin.isVerified,
        admin,
      });
    } catch (error) {
      console.error("Error updating admin:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  
  // controllers/adminController.js
  // export const getCurrentAdmin = async (req, res) => {
  //   try {
  //     const admin = await Admin.findById(req.admin._id); // ❌ remove populate
  //     if (!admin) {
  //       return res.status(404).json({ message: "Admin not found" });
  //     }
  
  //     // Destructure sensitive fields
  //     const { password, ...rest } = admin._doc;
  
  //     res.status(200).json(rest);
  //   } catch (err) {
  //     console.error("Failed to get admin profile:", err);
  //     res.status(500).json({ message: "Failed to retrieve admin data." });
  //   }
  // };
  
