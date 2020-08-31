import { MiddlewareFn } from "type-graphql"

export const resolveTime: MiddlewareFn = async ({ info }, next) => {
  const start = Date.now()
  await next()
  const resolveTime = Date.now() - start
  console.log(`${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`)
}