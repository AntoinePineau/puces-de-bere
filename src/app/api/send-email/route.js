// pages/api/sendEmail.js
import nodemailer from 'nodemailer';

export default async function POST(req, res) {
  const { to, subject, text } = req.body;

  // Create transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS, // Your Gmail password or App Password if 2FA is enabled
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    cc: 'rotary.chateaubriant@gmail.com',
    subject,
    text,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
}