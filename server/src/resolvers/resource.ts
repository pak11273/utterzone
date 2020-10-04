import {
  Resolver,
  Query,
  Mutation,
  Arg,
  PubSub,
  Publisher,
  Subscription,
  Root,
  ID,
  ResolverFilterData,
  Args,
} from "type-graphql"

import { Resource } from "../entities/Resource"
import { CommentInput } from "../shared/inputs/comment.input"
import { Comment } from "../entities/Comment"
import { NewCommentPayload } from "../shared/interfaces/newComment.interface"
import { Topic } from "../shared/enums/Topic"
import { sampleResources } from "../data/Resource.samples"
import { NewCommentsArgs } from "../shared/args/resource.resolver.args"

@Resolver()
export class ResourceResolver {
  private readonly Resources: Resource[] = sampleResources.sample.slice()

  @Query(_returns => Resource, { nullable: true })
  async Resource(@Arg("id", _type => ID) id: string) {
    return this.Resources.find(Resource => Resource.id === id)
  }

  @Mutation(_returns => Boolean)
  async addNewComment(
    @Arg("comment") input: CommentInput,
    @PubSub(Topic.NewComment)
    notifyAboutNewComment: Publisher<NewCommentPayload>
  ): Promise<boolean> {
    const Resource = this.Resources.find(r => r.id === input.name)
    if (!Resource) {
      return false
    }
    const comment: Comment = {
      content: input.content,
      username: input.username,
      date: new Date(),
    }
    Resource.comments.push(comment)
    await notifyAboutNewComment({
      content: comment.content,
      username: comment.username,
      dateString: comment.date.toISOString(),
      name: input.name,
    })
    return true
  }

  @Subscription(_returns => Comment, {
    topics: Topic.NewComment,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<NewCommentPayload, NewCommentsArgs>) => {
      return payload.name === args.name
    },
  })
  newComments(
    @Root() newComment: NewCommentPayload,
    @Args() { name }: NewCommentsArgs
  ): Comment {
    console.log("name: ", name)
    return {
      content: newComment.content!,
      date: new Date(newComment.dateString), // limitation of Redis payload serialization
      username: newComment.username,
    }
  }
}
