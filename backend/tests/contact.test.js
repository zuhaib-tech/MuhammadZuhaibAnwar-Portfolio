const request = require('supertest')
const app = require('../index')

describe('POST /api/contact', () => {
  it('accepts valid contact and returns 202', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Test User', email: 'test@example.com', message: 'Hello there' })
      .set('Accept', 'application/json')
    expect(res.status).toBe(202)
    expect(res.body).toHaveProperty('status', 'received')
  })

  it('rejects when honeypot is filled', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Bot', email: 'bot@example.com', message: 'Spam', hp: 'I am a bot' })
      .set('Accept', 'application/json')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
