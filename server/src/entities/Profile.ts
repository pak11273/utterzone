import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { User } from "./User"

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  avatar: string

  @Column(() => User)
  following: User[]

  @Column(() => User)
  followers: User[]

  @Column()
  gender: string

  @Column()
  language: string

  @Column()
  twitter: string

  @Column()
  timezone: string

  @Column()
  bio: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
