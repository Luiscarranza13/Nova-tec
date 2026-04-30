// Rate limiter compatible con serverless (Edge/Node) usando unstable_cache de Next.js
// Para producción real con múltiples instancias, usa @upstash/ratelimit + @upstash/redis

const store = new Map<string, { count: number; reset: number }>()

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): { success: boolean; remaining: number } {
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

// Limpia entradas expiradas cada 5 minutos
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    store.forEach((v, k) => {
      if (now > v.reset) store.delete(k)
    })
  }, 5 * 60_000)
}

// NOTA: En producción con Vercel (múltiples instancias), instala:
// npm install @upstash/ratelimit @upstash/redis
// y reemplaza esta implementación con:
//
// import { Ratelimit } from '@upstash/ratelimit'
// import { Redis } from '@upstash/redis'
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(5, '1 m'),
// })
// export async function rateLimit(key: string) {
//   return ratelimit.limit(key)
// }
