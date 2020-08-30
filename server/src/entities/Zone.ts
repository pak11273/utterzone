import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { Message } from "./Message"
import { User } from "./User"

@ObjectType()
@Entity()
export class Zone extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  name: string

  @Field(() => User)
  @OneToOne(() => User, user => user.zone)
  owner: User

  @OneToMany(() => User, user => user)
  participants: User[]

  @Field()
  description: string

  @OneToMany(() => Message, message => message.user)
  messages: Message[]

  @Field(() => Message)
  lastMessage: Message

  @Field()
  public: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
