import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(req: Request) {
  const { email, message, name } = await req.json()

  try {
    sendContactReply(email, name, message)
  } catch (error) {
    return Response.json({
      status: 500,
      error,
      data: null,
    })
  }

  return Response.json({
    status: 200,
    error: null,
    data: 'Message sent. We will get back to you as soon as possible.',
  })
}

async function sendContactReply(email: string, name: string, message: string) {
  try {
    await sendgrid.send({
      from: `${process.env.CONTACT_EMAIL}`,
      to: email,
      cc: `${process.env.CONTACT_EMAIL}`,
      subject: `Real SaaS | Thank you for contacting us!`,
      text: 'contact email reply',
      html: `<p style="font-size: 12px;">Hey ${
        name || ''
      }! Thank you for contacting us with the following message:</p>
        <br />
        <p style="font-size: 12px;">${message}</p>
        <br />
        <p style="font-size: 12px;">Our team will get back to you as soon as possible. Thank you for your patience.</p>
        Sincerely,<br />
        The Real SaaS Team`,
    })
  } catch (err) {
    console.log('mail error', err)
  }
}
