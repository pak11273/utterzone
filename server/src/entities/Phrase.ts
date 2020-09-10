import { BaseEntity, PrimaryGeneratedColumn } from "typeorm"

import { Field } from "type-graphql"

export class Phrase extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  phrase: string

  @Field()
  definition: string // translation

  @Field()
  meta: string[]
}
