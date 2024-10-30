import nodemailer from 'nodemailer';
import formidable from 'formidable';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const form = formidable({
    maxFileSize: 25 * 1024 * 1024, // Limite de 25 Mo
  });

  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        resolve(NextResponse.json({ message: 'Error parsing the files', error: err }, { status: 500 }));
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
        resolve(NextResponse.json({ message: 'Email sent successfully' }, { status: 200 }));
      } catch (error) {
        console.error('Error sending email:', error);
        resolve(NextResponse.json({ message: 'Failed to send email', error }, { status: 500 }));
      }
    });
  });
}
