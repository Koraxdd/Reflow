import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

export const loginRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
})

export const signUpRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
})

export const passwordRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "15 m"),
    analytics: true,
})

export const emailRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "15 m"),
    analytics: true,
})
