import React from "react"
import { withApollo } from "../utils/withApollo"

const Index = () => {
  // const { data, error, loading, fetchMore, variables } = usePostsQuery({
  //   variables: {
  //     limit: 15,
  //     cursor: null,
  //   },
  //   notifyOnNetworkStatusChange: true,
  // })

  // if (!loading && !data) {
  //   return (
  //     <div>
  //       <div>you got query failed for some reason</div>
  //       <div>{error?.message}</div>
  //     </div>
  //   )
  // }

  return (
    <>
      {/* {!data && loading ? (
        <div>loading...</div>
      ) : (
        <div>
          {data!.posts.posts.map((p: any) =>
            !p ? null : (
              <div key={p.id}>
                <UpdootSection post={p} />
                <div>
                  <link href="/post/[id]" as={`/post/${p.id}`}>
                    <link>
                      <div>{p.title}</div>
                    </link>
                  </link>
                  <text>posted by {p.creator.username}</text>
                  <div>
                    <text>{p.textSnippet}</text>
                    {/* <div>
                      <EditDeletePostbuttons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </div> */}
      {/* </div>
                </div>
              </div>
            )
          )}
        </div>
      // )}
      {data && data.posts.hasMore ? (
        <div>
          <button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                }, 
       // updateQuery: ( // previousValue, // {fetchMoreResult}
      // ): PostsQuery =>{" "}
      // {
        //   if (!fetchMoreResult) {
        //     return previousValue as PostsQuery;
        //   }
        //   return {
        //     __typename: "Query",
        //     posts: {
        //       __typename: "PaginatedPosts",
        //       hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
        //       posts: [
        //         ...(previousValue as PostsQuery).posts.posts,
        //         ...(fetchMoreResult as PostsQuery).posts.posts,
        //       ],
        //     },
        //   };
        // },
      }
      )
      {/* }}
            // isLoading={loading}
          >
            load more
          </button>
        </div>
      ) : null} */}
    </>
  )
}

export const Home = withApollo({ ssr: true })(Index)
