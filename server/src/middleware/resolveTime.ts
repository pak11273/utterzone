import { MiddlewareFn } from "type-graphql"

export const resolveTime: MiddlewareFn = async ({ info }, next) => {
  const start = Date.now()
  await next()
  const resolveTime = Date.now() - start
  if (process.env.NODE_ENV !== "test") {
    console.log(`${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`)
  }
}
