const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const razorpay = require('../config/razorpay');

// Generate order
router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt: `receipt_order_${Math.random() * 10000}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify signature
router.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (sign === razorpay_signature) {
    res.status(200).json({ success: true, message: 'Payment verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
});

module.exports = router;
