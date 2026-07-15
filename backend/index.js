require('dotenv').config()
const express = require('express')
if (process.env.SENTRY_DSN) {
	try { require('@sentry/node').init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.05 }) } catch (e) { console.warn('Sentry init failed', e.message) }
}
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const contactRouter = require('./routes/contact')

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())

const limiter = rateLimit({ windowMs: 60 * 1000, max: 10 })
app.use('/api/contact', limiter)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/contact', contactRouter)

const PORT = process.env.PORT || 4000

if (require.main === module) {
	app.listen(PORT, () => console.log(`Backend listening on ${PORT}`))
}

module.exports = app
