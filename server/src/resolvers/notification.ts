import { PubSubEngine } from "graphql-subscriptions"
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  PubSub,
  Publisher,
  Subscription,
  Root,
  ResolverFilterData,
  UseMiddleware,
} from "type-graphql"

import { Notification, NotificationPayload } from "../entities/Notification"
import { resolveTime } from "../middleware/resolveTime"

@Resolver()
export class NotificationResolver {
  private autoIncrement = 0

  @Query(_returns => Date)
  currentDate() {
    return new Date()
  }

  @Mutation(_returns => Boolean)
  async pubSubMutation(
    @PubSub() pubsub: PubSubEngine,
    @Arg("message", { nullable: true }) message?: string
  ): Promise<boolean> {
    const payload: NotificationPayload = { id: ++this.autoIncrement, message }
    await pubsub.publish("NOTIFICATIONS", payload)
    return true
  }

  @Mutation(_returns => Boolean)
  async publisherMutation(
    @PubSub("NOTIFICATIONS") publish: Publisher<NotificationPayload>,
    @Arg("message", { nullable: true }) message?: string
  ): Promise<boolean> {
    await publish({ id: ++this.autoIncrement, message })
    return true
  }

  @Subscription({ topics: "NOTIFICATIONS" })
  normalSubscription(
    @Root() { id, message }: NotificationPayload
  ): Notification {
    return { id, message, date: new Date() }
  }

  @Subscription(_returns => Notification, {
    topics: "NOTIFICATIONS",
    filter: ({ payload }: ResolverFilterData<NotificationPayload>) =>
      payload.id % 2 === 0,
  })
  subscriptionWithFilter(@Root() { id, message }: NotificationPayload) {
    const newNotification: Notification = { id, message, date: new Date() }
    return newNotification
  }

  // dynamic topic

  @Mutation(_returns => Boolean)
  @UseMiddleware(resolveTime)
  async pubSubMutationToDynamicTopic(
    @PubSub()
    pubsub: PubSubEngine,
    @Arg("topic")
    topic: string,
    @Arg("message", { nullable: true }) message?: string
  ): Promise<boolean> {
    const payload: NotificationPayload = { id: ++this.autoIncrement, message }
    await pubsub.publish(topic, payload)
    return true
  }

  @Subscription({
    topics: ({ args }) => args.topic,
  })
  subscriptionWithFilterToDynamicTopic(
    @Arg("topic") _topic: string,
    @Root() { id, message }: NotificationPayload
  ): Notification {
    return { id, message, date: new Date() }
  }
}
