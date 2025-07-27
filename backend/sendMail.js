const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (toEmail) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: 'Welcome to WellGlimpse!',
    html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; background-color: #f9f9f9; color: #333;">
    <h2 style="color: #2c3e50;">Welcome to WellGlimpse</h2>
    <p>Hi there,</p>

    <p>We're thrilled to have you join our growing health-focused community. Your wellness journey just got a boost with the power of intelligent care and support!</p>

    <p>Meet <strong>Aiva</strong>, your personal AI assistant — she's here to guide you, answer your health questions, and help you understand your reports in a smarter way.</p>

    <p>✨ Whether you're tracking symptoms of diabetes, analyzing reports, or seeking lifestyle tips — <strong>Aiva</strong> and our team are always by your side.</p>

    <p style="margin-top: 20px;">Let’s take a step towards better health — together!</p>

    <p style="margin-top: 30px;">Warm regards,<br>
    <strong>Team WellGlimpse</strong></p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #777;">
      This is an automated message. If you have any questions, feel free to reply or contact our support team.
    </p>
  </div>
`
};

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${toEmail}`);
  } catch (err) {
    console.error('❌ Email sending failed:', err);
  }
};

module.exports = sendWelcomeEmail;
