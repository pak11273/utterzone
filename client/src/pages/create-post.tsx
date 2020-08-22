import { Form, Formik } from "formik"

import { InputField } from "../components/InputField"
import { Layout } from "../components/Layout"
import React from "react"
import { useCreatePostMutation } from "../generated/graphql"
import { useIsAuth } from "../utils/useIsAuth"
import { withApollo } from "../utils/withApollo"

const CreatePost: React.FC<{}> = ({}) => {
  useIsAuth()
  const [createPost] = useCreatePostMutation()
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async values => {
          const { errors } = await createPost({
            variables: { input: values },
            update: (cache: any) => {
              cache.evict({ fieldName: "posts:{}" })
            },
          })
          if (!errors) {
            // router.push("/")
          }
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
            <button type="submit">create post</button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(CreatePost)
