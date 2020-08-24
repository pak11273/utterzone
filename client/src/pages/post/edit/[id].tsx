import { Form, Formik } from "formik"
import { usePostQuery, useUpdatePostMutation } from "../../../generated/graphql"

import { InputField } from "../../../components"
import { Layout } from "../../../components/Layout"
import React from "react"
import { useGetIntId } from "../../../utils/useGetIntId"
import { withApollo } from "../../../utils/withApollo"

const EditPost = ({}) => {
  // const router = useRouter()
  const intId = useGetIntId()
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    // variables: { id: intId },
  })
  const [updatePost] = useUpdatePostMutation()
  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    )
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    )
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values: any) => {
          await updatePost({ variables: { id: intId, ...values } })
          // router.back()
        }}
      >
        {/* {({ isSubmitting }) => ( */}
        {() => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <div>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </div>
            <button
              type="submit"
              // isLoading={isSubmitting}
            >
              update post
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(EditPost)
