import { ClassType, Field, ObjectType } from "type-graphql"

// import { MinLength } from "class-validator"

export const MixinFieldError = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  class FieldError extends BaseClass {
    @Field()
    field: string
    @Field()
    message: string
  }
  return FieldError
}
