import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { Message } from "./Message"
import { Organization } from "./Organization"
import { Post } from "./Post"
import { Updoot } from "./Updoot"
import { Zone } from "./Zone"

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  username!: string

  @Field()
  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @OneToMany(() => Message, message => message.user)
  messages: Message[]

  @OneToMany(() => Organization, org => org.owner)
  organizations: Organization[]

  @OneToMany(() => Post, post => post.creator)
  posts: Post[]

  @OneToMany(() => Updoot, updoot => updoot.user)
  updoots: Updoot[]

  @Field()
  zone: Zone

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
