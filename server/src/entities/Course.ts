import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"

import { User } from "./User"

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  name: string

  @Field(_type => User)
  @ManyToOne(_type => User, user => user.course)
  owner: User

  @Field()
  @OneToOne(_type => Course, course => course.zone)
  zone: Course
}
