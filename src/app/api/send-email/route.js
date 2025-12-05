import mailjet from 'node-mailjet';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const mailjetClient = mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY);
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
            Email: "lespucesdebere@pineau.pm", // Adresse e-mail de l'expéditeur
            Name: "Les Puces de Béré", // Nom de l'expéditeur
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: `<p>${text.replace(/\n/g, '<br/>')}</p>`, // Si vous souhaitez également envoyer en HTML
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
