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
  @Column()
  name: string

  @Field()
  @Column()
  hostId: number

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

  @Field()
  @Column()
  description: string

  @OneToMany(() => Message, message => message.user)
  messages: Message[]

  @Field(_type => Message)
  lastMessage: Message

  @Column()
  password!: string

  @Field()
  @Column()
  public: boolean

  @Field()
  @Column()
  mature: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date
}
