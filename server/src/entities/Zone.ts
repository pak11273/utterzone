import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { Message } from "./Message"
import { User } from "./User"

@ObjectType()
@Entity()
export class Zone extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  name: string

  @Field({ nullable: true })
  app: string

  @Field()
  hostId: number

  @Field()
  zoneId: string

  @ManyToOne(_type => User, user => user.zones)
  host: User

  @OneToMany(() => User, user => user)
  participants: User[]

  @Field()
  learningLanguage?: string

  @Field()
  nativeLanguage?: string

  @Field()
  maxParticipants?: number

  @Field({ nullable: true })
  description: string

  @OneToMany(() => Message, message => message.zone)
  messages: Message[]

  @Field(_type => Message)
  lastMessage: Message

  @Field()
  password!: string

  @Field()
  public: boolean

  @Field()
  mature: boolean

  @Field()
  premium: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date
}
