import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js"; // Import the multer configuration
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  userAvatarController,
  removeImageFromCloudinary,
  updateUserDetails,
  sendOtpController,
  verifyOtpController,
  resetPasswordController,
  sendVerificationEmail,
  resendVerificationEmail,
  getCurrentUser,


} from "../controllers/UserController.js";

const router = express.Router();

// User registration and authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get('/verify/:token', verifyEmail); // Supports ?check=true
router.post('/verify/:token', verifyEmail); // Actual verification


// Avatar upload route (uses multer for file handling)
router.put("/user-avatar", authenticate, upload.single("avatar"), userAvatarController);

// Remove image from Cloudinary route
router.delete("/remove-image", authenticate, removeImageFromCloudinary);
router.patch("/update/:id",authenticate, updateUserDetails);
router.post("/send-otp", sendOtpController);       // Send OTP to email
router.post("/verify-otp", verifyOtpController);   // Verify OTP
router.post("/reset-password", resetPasswordController);  // Reset password
router.post("/send-verification",sendVerificationEmail);  
router.get("/me", authenticate, getCurrentUser);




router.post("/resend-verification", resendVerificationEmail);



export default router;
