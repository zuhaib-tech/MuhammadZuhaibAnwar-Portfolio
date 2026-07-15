import { useState } from 'react'
import { isValidEmail } from '../lib/emailValidation.mjs'
import styles from '../styles/Contact.module.css'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hp, setHp] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)
    if (!name || !email || !message) {
      setStatus({ type: 'error', text: 'Please complete all fields.' })
      return
    }

    if (!isValidEmail(email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' })
      return
    }
    setLoading(true)
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || ''
      const baseUrl = base || window.location.origin
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, hp }),
      })
      if (res.status === 202) {
        const json = await res.json().catch(() => ({}))
        if (json.email === 'failed') {
          setStatus({ type: 'error', text: 'Message stored, but email delivery failed. Check SMTP settings.' })
        } else {
          setStatus({ type: 'success', text: 'Message sent — thank you!' })
          setName('')
          setEmail('')
          setMessage('')
        }
      } else {
        const json = await res.json().catch(() => ({}))
        setStatus({ type: 'error', text: json.error || 'Failed to send message.' })
      }
    } catch (e) {
      setStatus({ type: 'error', text: 'Network error — try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot field - visually hidden to users but present for bots */}
      <input className={styles.honeypot} name="hp" value={hp} onChange={(e) => setHp(e.target.value)} autoComplete="off" />
      <label className={styles.label}>
        Name
        <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className={styles.label}>
        Email
        <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {!email || isValidEmail(email) ? null : <span className={styles.error}>Please enter a valid email address.</span>}
      </label>
      <label className={styles.label}>
        Message
        <textarea className={styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)} rows={6} />
      </label>
      <div className={styles.actions}>
        <button className={styles.button} type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
      </div>
      {status && (
        <div className={status.type === 'error' ? styles.error : styles.success}>{status.text}</div>
      )}
    </form>
  )
}
