import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ID, ObjectType } from "type-graphql"

import { Message } from "./Message"
import { User } from "./User"

@ObjectType()
@Entity()
export class Zone extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column({ nullable: true })
  name: string

  @Field()
  @Column({ nullable: true, default: "chat" })
  app: string

  @Field()
  @Column({ nullable: true })
  hostname: string

  @Field()
  @PrimaryGeneratedColumn("uuid")
  token: string

  @ManyToOne(_type => User, user => user.zones)
  host: User

  @OneToMany(() => User, user => user)
  participants: User[]

  @Field()
  @Column()
  learningLanguage?: string

  @Field()
  @Column()
  nativeLanguage?: string

  @Field()
  @Column()
  maxParticipants?: number

  @Field({ nullable: true })
  @Column()
  description: string

  @OneToMany(() => Message, message => message.zone)
  messages: Message[]

  @Field(_type => Message)
  lastMessage: Message

  @Field()
  password!: string

  @Field()
  @Column()
  public: boolean

  @Field()
  @Column()
  mature: boolean

  @Field()
  @Column()
  premium: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date
}

@ObjectType()
export class ZoneEvent {
  @Field(_type => ID)
  id: number

  @Field({ nullable: true })
  message?: string

  @Field(_type => Date)
  date: Date
}
export interface ZonePayload {
  id: number
  message?: string
}
