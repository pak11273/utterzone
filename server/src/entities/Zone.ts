import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ID, ObjectType, registerEnumType } from "type-graphql"

import { Course } from "./Course"
import { Language } from "../shared/enums/Language.enums"
import { Message } from "./Message"
import { User } from "./User"

registerEnumType(Language, {
  name: "Language",
})

@ObjectType()
@Entity()
export class Zone extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column({ nullable: true, default: "A Random Zone" })
  name: string

  @Field()
  @Column({ nullable: true, default: "chat" })
  app: string

  @Field(() => Course)
  @OneToOne(_type => Course, course => course.zone)
  course: Course

  @Field()
  @Column({ nullable: true, unique: true })
  hostname: string

  @Field()
  @PrimaryGeneratedColumn("uuid")
  token: string

  @Field(() => [User])
  @OneToMany(() => User, user => user)
  participants: User[]

  @Field(_type => Language)
  @Column()
  learningLanguage: Language

  @Field(_type => Language)
  @Column()
  nativeLanguage: Language

  @Field()
  @Column({ nullable: true })
  maxParticipants: number

  @Field({ nullable: true })
  @Column()
  description: string

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
