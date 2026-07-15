const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { validateContact } = require('../validators/contactValidator')
const nodemailer = require('nodemailer')

const MESSAGES_FILE = path.join(__dirname, '..', 'messages.json')

function saveMessage(message) {
  let arr = []
  try {
    const content = fs.readFileSync(MESSAGES_FILE, 'utf8')
    arr = JSON.parse(content || '[]')
  } catch (e) {
    arr = []
  }
  arr.push({ ...message, id: Date.now(), createdAt: new Date().toISOString() })
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(arr, null, 2))
}

async function maybeSendEmail(message) {
  if (!process.env.SMTP_HOST) return
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  })

  // Notification to site owner
  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'no-reply@example.com',
    to: process.env.CONTACT_RECIPIENT,
    subject: `New contact from ${message.name}`,
    text: `${message.name} <${message.email}>\n\n${message.message}`,
  })

  // Optional confirmation to sender
  if (process.env.SEND_CONFIRMATION === 'true') {
    const confSubject = process.env.CONFIRM_SUBJECT || 'Thanks for contacting me'
    const confText = process.env.CONFIRM_TEMPLATE
      ? process.env.CONFIRM_TEMPLATE.replace(/\{\{name\}\}/g, message.name)
      : `Hi ${message.name},\n\nThanks for reaching out — I received your message and will get back to you soon.\n\n—` + (process.env.CONTACT_RECIPIENT || '')

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@example.com',
      to: message.email,
      subject: confSubject,
      text: confText,
    })
  }
}

router.post('/', async (req, res) => {
  const { error, value } = validateContact(req.body)
  if (error) return res.status(400).json({ error: 'Validation failed', details: error.details })

  try {
    saveMessage(value)
    // Send email if configured (best-effort)
    try { await maybeSendEmail(value) } catch (e) { console.warn('Email send failed:', e.message) }
    return res.status(202).json({ status: 'received' })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
