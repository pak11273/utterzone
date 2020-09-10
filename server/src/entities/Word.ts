import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"

import { Field } from "type-graphql"

export class Word extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  definition: string //translation

  @Field()
  @Column()
  pronunciation: string

  @Field()
  @Column()
  language: string
}
