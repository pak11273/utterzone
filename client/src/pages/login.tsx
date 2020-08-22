import { Form, Formik } from "formik"
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql"

import { InputField } from "../components/InputField"
import React from "react"
import { Wrapper } from "../components/Wrapper"
import { toErrorMap } from "../utils/toErrorMap"
import { withApollo } from "../utils/withApollo"

const Login: React.FC<{}> = ({}) => {
  // const router = useRouter();
  const [login] = useLoginMutation()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            // update: (cache: any, { data }: { data: any }) => {
            //   cache.writeQuery<MeQuery>({
            //     query: MeDocument,
            //     data: {
            //       __typename: "Query",
            //       me: data?.login.user,
            //     },
            //   })
            //   cache.evict({ fieldName: "posts:{}" })
            // },
          })
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors))
          // } else if (response.data?.login.user) {
          // if (typeof router.query.next === "string") {
          // router.push(router.query.next)
          // } else {
          // worked
          // router.push("/")
          // }
          // }
        }}
      >
        {() => (
          // {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <div>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </div>
            <div>
              <link href="/forgot-password">
                <link>forgot password?</link>
              </link>
            </div>
            <button
              type="submit"
              // isLoading={isSubmitting}
            >
              login
            </button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withApollo({ ssr: false })(Login)
