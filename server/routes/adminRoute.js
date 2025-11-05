import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminDetails,
  uploadAdminAvatar,
  removeAdminAvatar,
  sendAdminResetOTP,
  verifyAdminOTP,
  resetAdminPassword,
  verifyAdminEmail,
 // getCurrentAdmin
} from '../controllers/adminController.js';

import adminAuth from '../middleware/admin.auth.middleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/logout', logoutAdmin);

router.get('/verify/:token', verifyAdminEmail);
router.post('/verify/:token', verifyAdminEmail);


router.get('/me', adminAuth, getAdminProfile);
router.put('/update-profile/:id', adminAuth, updateAdminDetails);


router.put('/upload-avatar', adminAuth, upload.single('avatar'), uploadAdminAvatar);
router.delete('/remove-avatar', adminAuth, removeAdminAvatar);


router.post('/forgot-password', sendAdminResetOTP);
router.post('/verify-otp', verifyAdminOTP);
router.post('/reset-password', resetAdminPassword);
//router.get("/me", adminAuth, getCurrentAdmin);


export default router;
