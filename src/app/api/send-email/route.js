import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  
  const to = formData.get('to');
  const subject = formData.get('subject');
  const text = formData.get('text');
  const attachments = [];

  // Process file if it exists in formData
  const file = formData.get('attachments');
  if (file) {
    attachments.push({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
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
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error sending email with user ${process.env.GMAIL_USER} and password ${process.env.GMAIL_PASS}:`, error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
