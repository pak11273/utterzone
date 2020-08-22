// import { EditDeletePostbuttons } from "../../components/EditDeletePostbuttons"

import { Layout } from "../../components/Layout"
import React from "react"
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl"
import { withApollo } from "../../utils/withApollo"

const Post = ({}) => {
  const { data, error, loading } = useGetPostFromUrl()

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    )
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>{data.post.title}</div>
      <div>{data.post.text}</div>
      {/* <EditDeletePostbuttons
        id={data.post.id}
        creatorId={data.post.creator.id}
      /> */}
    </Layout>
  )
}

export default withApollo({ ssr: true })(Post)
