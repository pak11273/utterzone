import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { Message } from "./Message"
import { Post } from "./Post"
import { Profile } from "./Profile"
import { Updoot } from "./Updoot"
import { Zone } from "./Zone"

// import { Organization } from "./Organization"

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

  // @OneToMany(() => Organization, org => org.owner)
  // organizations: Organization[]

  @OneToMany(() => Post, post => post.creator)
  posts: Post[]

  @Column({ nullable: true })
  ProfileId: number

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile

  @OneToMany(() => Updoot, updoot => updoot.user)
  updoots: Updoot[]

  @Field(() => [Zone])
  zones: Zone[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
