import { useDeletePostMutation, useMeQuery } from "../generated/graphql"

import React from "react"

interface EditDeletePostbuttonsProps {
  id: number
  creatorId: number
}

export const EditDeletePostbuttons: React.FC<EditDeletePostbuttonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery()
  const [deletePost] = useDeletePostMutation()

  if (meData?.me?.id !== creatorId) {
    return null
  }

  return (
    <div>
      <link href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <button aria-label="Edit Post" />
      </link>
      <button
        aria-label="Delete Post"
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache: any) => {
              // Post:77
              cache.evict({ id: "Post:" + id })
            },
          })
        }}
      />
    </div>
  )
}
