import { ApolloError } from "apollo-server-express"
import { createMethodDecorator } from "type-graphql"

export function Test() {
  return createMethodDecorator(async ({ args }, next) => {
    // here place your middleware code that uses custom decorator arguments
    console.log("test deco args: ", args)

    // console.log("test deco ctx: ", context.header)
    // console.log(context.req.session.userId)

    // TODO: are you already in this zone?

    // TODO: are you banned from this zone? DB should contain banned list

    // TODO: if private zone, do you have the right password?

    try {
      return next()
    } catch (err) {
      throw new ApolloError("Something happened.")
    }
  })
}
