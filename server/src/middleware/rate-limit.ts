import { MiddlewareFn } from "type-graphql"
import { MyContext } from "../types"
import { redis } from "../redis"

const tframe: any = {
  min: 60,
  hour: 60 * 60,
  day: 60 * 60 * 24,
  week: 60 * 60 * 24 * 7,
  month: 60 * 60 * 24 * 7 * 4,
  year: 60 * 60 * 24 * 7 * 4 * 12,
}

export const rateLimit: ({
  limitAnon,
  limitUser,
  msg,
  time,
  multiplier,
}: {
  limitAnon: number
  limitUser: number
  msg: string
  time: string
  multiplier?: number
}) => MiddlewareFn<MyContext> = ({
  limitAnon,
  limitUser,
  msg,
  time,
  multiplier = 1,
}) => async ({ context: { req }, info }, next) => {
  try {
    const isAnon = !req.session!.userId
    const key = `rate-limit:${info.fieldName}:${
      isAnon ? req.ip : req.session!.userId
    }`

    const current = await redis.incr(key)
    if ((isAnon && current > limitAnon) || (!isAnon && current > limitUser)) {
      return {
        data: {
          [info.fieldName]: {
            errors: msg,
          },
        },
      }
    } else if (current === 1) {
      await redis.expire(key, tframe[time] * multiplier)
    }

    const result = await next()
    return result
  } catch (err) {
    return err
  }
}
