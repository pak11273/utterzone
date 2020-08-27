import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

import { Field } from "type-graphql"
import { User } from "./User"

@Entity()
export class Profile {
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
