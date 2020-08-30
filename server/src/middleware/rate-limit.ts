import { ApolloError } from "apollo-server-express"
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
  msgAnon,
  msgUser,
  time,
  multiplier,
}: {
  limitAnon: number
  limitUser: number
  msgAnon: string
  msgUser: string
  time: string
  multiplier?: number
}) => MiddlewareFn<MyContext> = ({
  limitAnon,
  limitUser,
  msgAnon,
  msgUser,
  time,
  multiplier = 1,
}) => async ({ context: { req }, info }, next) => {
  try {
    // no session = anon user
    const isAnon = !req.session!.userId
    const key = `rate-limit:${info.fieldName}:${
      isAnon
        ? req.headers.origin
        : req.headers.origin + ":" + req.session!.userId
    }`

    const current = await redis.llen(key)
    console.log("current: ", current)
    console.log("isanon: ", isAnon)
    if (isAnon && current >= limitAnon) {
      console.log("info: ", info.fieldName)
      throw new ApolloError(msgAnon)
    }

    // logged in user rate limit
    if (!isAnon && current >= limitUser) {
      throw new ApolloError(msgUser)
    }
    const exists = await redis.exists(key)
    if (!exists) {
      console.log("EXISTS FOO FOO!")
      await redis
        .multi()
        .rpush(key, key)
        .expire(key, tframe[time] * multiplier)
        .exec()
      // await redis.expire(key, tframe[time] * multiplier)
    } else {
      await redis.rpushx(key, key)
    }
    const result = await next()
    return result
  } catch (err) {
    return err
  }
}
