import { BaseEntity, PrimaryGeneratedColumn } from "typeorm"

import { Field } from "type-graphql"
import { Phrase } from "./Phrase"
import { Word } from "./Word"

export class Level extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  words: Word[]

  @Field()
  phrases: Phrase[]
}
