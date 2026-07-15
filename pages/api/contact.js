import { createClient } from '@supabase/supabase-js'
import { isValidEmail } from '../../lib/emailValidation.mjs'
import { sendContactEmail } from '../../lib/sendMail.js'

function validateContact(body) {
  const name = body?.name?.toString().trim()
  const email = body?.email?.toString().trim().toLowerCase()
  const message = body?.message?.toString().trim()
  const hp = body?.hp?.toString().trim()

  if (hp) {
    return { valid: false, error: 'Spam detected' }
  }

  if (!name || !email || !message) {
    return { valid: false, error: 'All fields are required' }
  }

  if (!isValidEmail(email)) {
    return { valid: false, error: 'Email is invalid' }
  }

  return { valid: true, value: { name, email, message } }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { valid, error, value } = validateContact(req.body)
  if (!valid) {
    return res.status(400).json({ error })
  }

  const { data, error: insertError } = await supabase
    .from('contact_messages')
    .insert([{ name: value.name, email: value.email, message: value.message }])

  if (insertError) {
    console.error('Supabase insert failed:', insertError)
    return res.status(500).json({ error: 'Unable to save message' })
  }

  try {
    const mailResult = await sendContactEmail({
      name: value.name,
      email: value.email,
      message: value.message,
    })

    if (!mailResult?.ok) {
      const reason = mailResult?.reason || 'Unknown email delivery failure'
      console.warn('Email not sent:', reason)
      return res.status(202).json({ status: 'received', data, email: 'failed', reason })
    }
  } catch (mailError) {
    console.error('Email send failed:', mailError)
    return res.status(202).json({ status: 'received', data, email: 'failed', reason: mailError.message })
  }

  return res.status(202).json({ status: 'received', data, email: 'sent' })
}
