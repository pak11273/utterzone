import { ApolloError } from "apollo-server-express"
import { createMethodDecorator } from "type-graphql"

export function Test() {
  return createMethodDecorator(async ({ args }, next) => {
    // here place your middleware code that uses custom decorator arguments
    console.log("test deco args: ", args)
    // console.log("test deco ctx: ", context.header)
    // console.log(context.req.session.userId)
    try {
      return next()
    } catch (err) {
      throw new ApolloError("Something happened.")
    }
  })
}
