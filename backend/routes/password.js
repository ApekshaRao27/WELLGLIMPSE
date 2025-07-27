const express = require('express');
const crypto = require('node:crypto');
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt');
const router = express.Router();
const User = require('../models/User');
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ msg: 'If the account exists, a reset link was sent' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  const link = `http://localhost:3000/reset-password/${token}`;

  // ✅ Replace with your actual email and app password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset of WellGlimpse website',
    html: `<h3>Hello,</h3>
<p>We received a request to reset your password.</p>
<p>Click the button below to reset your password. This link will expire in <strong>15 minutes</strong>.</p>

<a href="${link}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>

<p>If you didn’t request this, you can safely ignore this email — your password will remain unchanged.</p>

<p>Thanks,<br><strong>Aiva -Your AI Health Assistant</strong></p>
`
  });

  res.json({ msg: 'Reset link sent to your email' });
});


router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    tokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.tokenExpiry = undefined;
  await user.save();

  res.json({ msg: 'Password updated successfully' });
});

module.exports = router;