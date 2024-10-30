import mailjet from 'node-mailjet';
import { NextResponse } from 'next/server';
//const mailjet = require('node-mailjet');

if (!mailjet.connect) {
  throw new Error('Mailjet connect method is not available. Please check the Mailjet library installation.');
}
if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY) {
  console.error('Mailjet API Key and Secret Key must be set in environment variables.');
}
const mailjetClient = mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY);


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
      ContentType: file.type,
      Filename: file.name,
      Base64Content: Buffer.from(await file.arrayBuffer()).toString('base64'), // Convertit le fichier en base64
    });
  }

  const request = mailjetClient
    .post('send', { 'version': 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: "lespucesdebere@gmail.com", // Adresse e-mail de l'expéditeur
            Name: "Les Puces de Béré", // Nom de l'expéditeur
          },
          To: [
            {
              Email: to,
            },
          ],
          Cc: [
            {
              Email: 'lespucesdebere@gmail.com', // CC
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: `<p>${text}</p>`, // Si vous souhaitez également envoyer en HTML
          Attachments: attachments.length ? attachments : undefined, // Ajoute les pièces jointes si elles existent
        },
      ],
    });

  try {
    await request;
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email with Mailjet:', error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
