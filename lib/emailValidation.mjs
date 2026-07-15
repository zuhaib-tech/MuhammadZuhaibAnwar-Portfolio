export function isValidEmail(email) {
  if (typeof email !== 'string') return false

  const normalized = email.trim().toLowerCase()
  if (!normalized) return false

  const pattern = /^(?!.*\.\.)(?!.*\.$)(?!.*@\.)(?!\.)(?:[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?)@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/
  return pattern.test(normalized)
}
