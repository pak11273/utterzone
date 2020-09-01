import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { Zone } from "./Zone"

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  content: string

  @Field({ nullable: true })
  @Column()
  username: string
  // @Field(() => String)
  // @ManyToOne(() => User, user => user.messages)
  // user: User

  // @Field()
  // zoneId: number

  @ManyToOne(() => Zone, zone => zone.messages)
  zone: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
