import nodemailer from 'nodemailer'

export async function sendContactEmail({ name, email, message }) {
  // Prefer SendGrid when API key is present
  const sendgridKey = process.env.SENDGRID_API_KEY
  const to = process.env.CONTACT_TO_EMAIL

  const subject = `New contact message from ${name}`
  const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

  if (sendgridKey) {
    try {
      const sgMail = await import('@sendgrid/mail')
      sgMail.default.setApiKey(sendgridKey)
      const msg = {
        to,
        from: process.env.SENDGRID_FROM || process.env.SMTP_FROM || process.env.SMTP_USER,
        replyTo: email,
        subject,
        text,
      }
      await sgMail.default.send(msg)
      return { ok: true }
    } catch (err) {
      return { ok: false, reason: err && err.message ? err.message : String(err) }
    }
  }

  // Fallback to SMTP via nodemailer
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass || !to) {
    return { ok: false, skipped: true, reason: 'Email configuration missing' }
  }

  const transporter = nodemailer.createTransport({
    service: host === 'smtp.gmail.com' ? 'gmail' : undefined,
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  })

  const mailOptions = {
    from: process.env.SMTP_FROM || user,
    to,
    replyTo: email,
    subject,
    text,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { ok: true }
  } catch (err) {
    return { ok: false, reason: err && err.message ? err.message : String(err) }
  }
}
