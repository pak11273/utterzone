import { Resolver, Query, Arg, ID } from "type-graphql"
import { Course } from "../entities/Course"

@Resolver()
export class CourseResolver {
  // private readonly Course: Course[] = sampleCourses.slice()

  @Query(_returns => Course, { nullable: true })
  async Course(@Arg("id", _type => ID) id: string) {
    return Course.find({ id: id })
  }
}
