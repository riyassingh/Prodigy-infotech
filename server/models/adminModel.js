import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Admin name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  phone:{
    type:String,
   
  },
  gender:{
    type:String,


  },

  avatar: {
    public_id: String,
    url: String,
  },


  // ✅ Address embedded directly in admin
  address: {
    addressLine: { type: String, default: "" },
    city:        { type: String, default: "" },
    state:       { type: String, default: "" },
    country:     { type: String, default: "" },
    pincode:     { type: String, default: "" },
  },

  permissions: {
    manageUsers: {
      type: Boolean,
      default: true,
    },
    manageProducts: {
      type: Boolean,
      default: true,
    },
    manageOrders: {
      type: Boolean,
      default: true,
    },
    manageCoupons: {
      type: Boolean,
      default: false,
    },
    manageAdmins: {
      type: Boolean,
      default: false,
    },
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordOTP: String,
  resetOTPExpire: Date,
  isVerifiedForReset: { type: Boolean, default: false },
});

// Hash the password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
adminSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
