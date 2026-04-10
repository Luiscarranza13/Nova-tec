// Simple in-memory rate limiter for Edge/Node
const store = new Map<string, { count: number; reset: number }>()

export function rateLimit(key: string, limit = 5, windowMs = 60_000): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 }
  }

  entry.count++
  return { success: true, remaining: limit - entry.count }
}

// Cleanup old entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    store.forEach((v, k) => { if (now > v.reset) store.delete(k) })
  }, 5 * 60_000)
}
