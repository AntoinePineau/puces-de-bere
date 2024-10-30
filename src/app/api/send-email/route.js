import nodemailer from 'nodemailer';
import formidable from 'formidable'; 

export async function POST(req, res) {
  const form = new formidable.IncomingForm();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing the files', error: err });
    }

    const { to, subject, text } = fields;
    const attachments = [];

    // Traiter les fichiers
    if (files.attachments) {
      if (Array.isArray(files.attachments)) {
        files.attachments.forEach(file => {
          attachments.push({
            filename: file.originalFilename,
            path: file.filepath,
          });
        });
      } else {
        attachments.push({
          filename: files.attachments.originalFilename,
          path: files.attachments.filepath,
        });
      }
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
      cc:'rotary.chateaubriant@gmail.com',
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