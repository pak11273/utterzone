import { Form, Formik } from "formik"
import React, { useState } from "react"

import { InputField } from "../../components/InputField"
import { Wrapper } from "../../components/Wrapper"
import { toErrorMap } from "../../utils/toErrorMap"
import { useChangePasswordMutation } from "../../generated/graphql"
import { withApollo } from "../../utils/withApollo"

const ChangePassword: any = () => {
  // const router = useRouter()
  const [changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState("")
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token: "pending",
              //   typeof router.query.token === "string"
              //     ? router.query.token
              //     : "",
            },
            // update: ((cache: any), ({ data } = {data: any})) => {
            //   cache.writeQuery<MeQuery>({
            //     query: MeDocument,
            //     data: {
            //       __typename: "Query",
            //       me: data?.changePassword.user,
            //     },
            //   })
            // },
          })
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors)
            if ("token" in errorMap) {
              setTokenError(errorMap.token)
            }
            setErrors(errorMap)
          } else if (response.data?.changePassword.user) {
            // worked
            // router.push("/")
          }
        }}
      >
        {/* {({ isSubmitting }) => ( */}
        {() => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            {tokenError ? (
              <div>
                <div>{tokenError}</div>
                <link href="/forgot-password">
                  <link>click here to get a new one</link>
                </link>
              </div>
            ) : null}
            <button
              type="submit"
              // isLoading={isSubmitting}
            >
              change password
            </button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withApollo({ ssr: false })(ChangePassword)
