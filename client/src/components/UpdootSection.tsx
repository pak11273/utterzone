import {
  PostSnippetFragment,
  VoteMutation,
  useVoteMutation,
} from "../generated/graphql"
import React, { useState } from "react"

import { ApolloCache } from "@apollo/client"
import gql from "graphql-tag"

interface UpdootSectionProps {
  post: PostSnippetFragment
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number
    points: number
    voteStatus: number | null
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  })

  if (data) {
    if (data.voteStatus === value) {
      return
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    })
  }
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading")
  const [vote] = useVoteMutation()
  console.log(loadingState)
  return (
    <div>
      <button
        onClick={async () => {
          if (post.voteStatus === 1) {
            return
          }
          setLoadingState("updoot-loading")
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache: any) => updateAfterVote(1, post.id, cache),
          })
          setLoadingState("not-loading")
        }}
        aria-label="updoot post"
      />
      {post.points}
      <button
        onClick={async () => {
          if (post.voteStatus === -1) {
            return
          }
          setLoadingState("downdoot-loading")
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache: any) => updateAfterVote(-1, post.id, cache),
          })
          setLoadingState("not-loading")
        }}
        aria-label="downdoot post"
      />
    </div>
  )
}
