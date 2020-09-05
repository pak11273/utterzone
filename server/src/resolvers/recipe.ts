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

import { Recipe } from "../entities/recipe"
import { CommentInput } from "../shared/inputs/comment.input"
import { Comment } from "../entities/Comment"
import { NewCommentPayload } from "../shared/interfaces/newComment.interface"
import { Topic } from "../types/Topic"
import { sampleRecipes } from "../data/recipe.samples"
import { NewCommentsArgs } from "../shared/args/recipe.resolver.args"

@Resolver()
export class RecipeResolver {
  private readonly recipes: Recipe[] = sampleRecipes.slice()

  @Query(_returns => Recipe, { nullable: true })
  async recipe(@Arg("id", _type => ID) id: string) {
    return this.recipes.find(recipe => recipe.id === id)
  }

  @Mutation(_returns => Boolean)
  async addNewComment(
    @Arg("comment") input: CommentInput,
    @PubSub(Topic.NewComment)
    notifyAboutNewComment: Publisher<NewCommentPayload>
  ): Promise<boolean> {
    const recipe = this.recipes.find(r => r.id === input.recipeId)
    if (!recipe) {
      return false
    }
    const comment: Comment = {
      content: input.content,
      nickname: input.nickname,
      date: new Date(),
    }
    recipe.comments.push(comment)
    await notifyAboutNewComment({
      content: comment.content,
      nickname: comment.nickname,
      dateString: comment.date.toISOString(),
      recipeId: input.recipeId,
    })
    return true
  }

  @Subscription(_returns => Comment, {
    topics: Topic.NewComment,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<NewCommentPayload, NewCommentsArgs>) => {
      return payload.recipeId === args.recipeId
    },
  })
  newComments(
    @Root() newComment: NewCommentPayload,
    @Args() { recipeId }: NewCommentsArgs
  ): Comment {
    console.log("recipeId: ", recipeId)
    return {
      content: newComment.content!,
      date: new Date(newComment.dateString), // limitation of Redis payload serialization
      nickname: newComment.nickname,
    }
  }
}
