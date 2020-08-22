import { Form, Formik } from "formik"
import React, { useState } from "react"

import { InputField } from "../components/InputField"
import { Wrapper } from "../components/Wrapper"
import { useForgotPasswordMutation } from "../generated/graphql"
import { withApollo } from "../utils/withApollo"

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false)
  const [forgotPassword] = useForgotPasswordMutation()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async values => {
          await forgotPassword({ variables: values })
          setComplete(true)
        }}
      >
        {/* {({ isSubmitting }) => */}
        {() =>
          complete ? (
            <div>
              if an account with that email exists, we sent you can email
            </div>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
              <button type="submit">forgot password</button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  )
}

export default withApollo({ ssr: false })(ForgotPassword)
