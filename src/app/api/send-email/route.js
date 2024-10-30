import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

// Désactiver l'analyseur de corps intégré de Next.js pour pouvoir gérer les fichiers
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const form = new formidable.IncomingForm({
    maxFileSize: 25 * 1024 * 1024, // Limite de 25 Mo
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing the files', error: err });
    }

    const { to, subject, text } = fields;
    const attachments = [];

    // Traiter les fichiers
    if (files.attachments) {
      const attachmentsArray = Array.isArray(files.attachments)
        ? files.attachments
        : [files.attachments];
      
      attachmentsArray.forEach(file => {
        attachments.push({
          filename: file.originalFilename,
          path: file.filepath, // Utilise le chemin temporaire
        });
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      cc: 'lespucesdebere@gmail.com',
      subject,
      text,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email', error });
    }
  });
}
