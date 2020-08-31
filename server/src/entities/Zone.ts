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
  name: string

  @Field()
  @Column()
  hostId: number

  @Field(() => User)
  @ManyToOne(() => User, user => user.zones)
  host: User

  @OneToMany(() => User, user => user)
  participants?: User[]

  @Field()
  learningLanguage?: string

  @Field()
  nativeLanguage?: string

  @Field()
  maxParticipants?: number

  @Field()
  description: string

  @OneToMany(() => Message, message => message.user)
  messages: Message[]

  @Field(() => Message)
  lastMessage?: Message

  @Column()
  password!: string

  @Field()
  public: boolean

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date
}
