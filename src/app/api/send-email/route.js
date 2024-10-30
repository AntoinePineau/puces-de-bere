import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

// Nouvelle configuration de segment de route
export const routeSegmentConfig = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = new formidable.IncomingForm({
    maxFileSize: 25 * 1024 * 1024, // Limite de 25 Mo
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject({ status: 500, json: { message: 'Error parsing the files', error: err } });
        return;
      }

      const { to, subject, text } = fields;
      const attachments = [];

      if (files.attachments) {
        const attachmentsArray = Array.isArray(files.attachments)
          ? files.attachments
          : [files.attachments];

        attachmentsArray.forEach(file => {
          attachments.push({
            filename: file.originalFilename,
            path: file.filepath,
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
        resolve({ status: 200, json: { message: 'Email sent successfully' } });
      } catch (error) {
        console.error('Error sending email:', error);
        reject({ status: 500, json: { message: 'Failed to send email', error } });
      }
    });
  });
}
