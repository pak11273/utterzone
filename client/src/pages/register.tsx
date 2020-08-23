import { Form, Formik } from "formik"

import { InputField } from "../components/InputField"
import React from "react"

// import { useRegisterMutation } from "../generated/graphql"

// import { withApollo } from "../utils/withApollo"

// import { toErrorMap } from "../utils/toErrorMap"

interface registerProps {}

export const Register: React.FC<registerProps> = () => {
  // const router = useRouter();
  // const [register] = useRegisterMutation()
  return (
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={() => console.log("hi")}
      // onSubmit={async (values, { setErrors }) => {
      //   const response = await register({
      //     variables: { options: values },
      //     update: (cache, { data }) => {
      //       cache.writeQuery<MeQuery>({
      //         query: MeDocument,
      //         data: {
      //           __typename: "Query",
      //           me: data?.register.user,
      //         },
      //       });
      //     },
      // });
      //   if (response.data?.register.errors) {
      //     setErrors(toErrorMap(response.data.register.errors));
      //   } else if (response.data?.register.user) {
      //     // worked
      //     router.push("/");
      //   }
      // }}
    >
      {/* {({ isSubmitting }) => ( */}
      {() => (
        <Form>
          <InputField name="username" placeholder="username" label="Username" />
          <div>
            <InputField name="email" placeholder="email" label="Email" />
          </div>
          <div>
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
          </div>
          <button
            type="submit"
            // isLoading={isSubmitting}
          >
            register
          </button>
        </Form>
      )}
    </Formik>
  )
}
