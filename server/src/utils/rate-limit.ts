import { MiddlewareFn } from "type-graphql"
import { MyContext } from "../types"
import { redis } from "../redis"

const ONE_DAY = 60 * 60 * 24

// const span = [
//   { min: 60 },
//   { hour: 60 * 60 },
//   { day: 60 * 60 * 24 },
//   { week: 60 * 60 * 24 * 7 },
//   { month: 60 * 60 * 24 * 7 * 4 },
//   { year: 60 * 60 * 24 * 7 * 4 * 12 },
// ]

export const rateLimit: (limit?: number) => MiddlewareFn<MyContext> = (
  limitForAnonUser = 50,
  limitForUser = 100
) => async ({ context: { req }, info }, next) => {
  const isAnon = !req.session!.userId
  const key = `rate-limit:${info.fieldName}:${
    isAnon ? req.ip : req.session!.userId
  }`

  const current = await redis.incr(key)
  if (
    (isAnon && current > limitForAnonUser) ||
    (!isAnon && current > limitForUser)
  ) {
    throw new Error("you're doing that too much")
  } else if (current === 1) {
    await redis.expire(key, ONE_DAY)
  }

  return next()
}
