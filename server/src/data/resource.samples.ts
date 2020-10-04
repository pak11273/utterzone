import { Comment } from "../entities/Comment"
import { Resource } from "../entities/Resource"
import { plainToClass } from "class-transformer"

export const sampleResources = {
  sample: [
    createResource({
      id: "1",
      title: "Resource 1",
      description: "Desc 1",
      comments: createComments([
        {
          date: new Date("2018-03-21"),
          content: "Very tasty!",
          username: "Anonymous",
        },
        {
          date: new Date("2018-01-12"),
          content: "Not so tasty!",
          username: "Anonymous again",
        },
      ]),
    }),
    createResource({
      id: "2",
      title: "Resource 2",
      description: "Desc 2",
      comments: createComments([
        {
          date: new Date(),
          content: "Very good, very cheap!",
          username: "Master of cooking",
        },
      ]),
    }),
    createResource({
      id: "3",
      title: "Resource 3",
      comments: [],
    }),
  ],
}

function createResource(ResourceData: Partial<Resource>): Resource {
  return plainToClass(Resource, ResourceData)
}

function createComments(commentData: Array<Partial<Comment>>): Comment[] {
  return plainToClass(Comment, commentData)
}
