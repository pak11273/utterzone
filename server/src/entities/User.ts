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

import { Course } from "./Course"
import { Post } from "./Post"
import { Profile } from "./Profile"
import { Updoot } from "./Updoot"
import { Zone } from "./Zone"

// import { Message } from "./Message"

// import { Organization } from "./Organization"

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field()
  @Column({ unique: true })
  username!: string

  @Field()
  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @OneToMany(_type => Course, course => course.owner)
  course: Course

  // @OneToMany(() => Message, message => message.user)
  // messages: Message[]

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

  @OneToOne(_type => Zone)
  @JoinColumn()
  zone: Zone

  @Field()
  @Column({ nullable: true })
  followers: number = 0

  @Field()
  @Column({ nullable: true })
  following: number = 0

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
