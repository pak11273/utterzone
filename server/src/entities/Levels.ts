import { BaseEntity, PrimaryGeneratedColumn } from "typeorm"

import { Field } from "type-graphql"
import { Phrase } from "./Phrase"
import { Word } from "./Word"

export class Level extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(_type => Word)
  words: Word[]

  @Field(_type => Phrase)
  phrases: Phrase[]
}
