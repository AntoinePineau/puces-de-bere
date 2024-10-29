// pages/api/sendEmail.js
import nodemailer from 'nodemailer';

export async function POST(req, res) {
  const body = await req.json(); // Assurez-vous de parser le corps de la requête
  console.log('Received body:', body); // Ajoutez ce log pour voir ce qui est reçu
  const { to, subject, text } = body;

  // Create transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    //service: 'gmail',
    host: 'smtp.gmail.com', // Spécifiez l'hôte SMTP
    port: 587, // Utilisez 587 pour TLS ou 465 pour SSL
    secure: false, // true pour le port 465,
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
    console.log(`Send mail (subject: ${subject} / text: ${text}) to ${to} from ${process.env.GMAIL_USER} with pass ${process.env.GMAIL_PASS}`);
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
}