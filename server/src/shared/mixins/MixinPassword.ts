import { ClassType, Field, InputType, ObjectType } from "type-graphql"

import { MinLength } from "class-validator"

// adds password property with validation to the base, extended class
export const MixinPassword = <TClassType extends ClassType>(
  BaseClass: TClassType
) => {
  @ObjectType({ isAbstract: true })
  @InputType({ isAbstract: true })
  class PasswordTrait extends BaseClass {
    @MinLength(8)
    @Field()
    password!: string
  }
  return PasswordTrait
}
