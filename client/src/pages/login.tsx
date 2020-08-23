// import { Form, Formik } from "formik"
// import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql"

// import { InputField } from "../components/InputField"
// import React from "react"
// import { toErrorMap } from "../utils/toErrorMap"
// import { withApollo } from "../utils/withApollo"

// const Login: React.FC<{}> = ({}) => {
//   // const router = useRouter();
//   const [login] = useLoginMutation()
//   return (
//       <Formik
//         initialValues={{ usernameOrEmail: "", password: "" }}
//         onSubmit={async (values, { setErrors }) => {
//           const response = await login({
//             variables: values,
//             // update: (cache: any, { data }: { data: any }) => {
//             //   cache.writeQuery<MeQuery>({
//             //     query: MeDocument,
//             //     data: {
//             //       __typename: "Query",
//             //       me: data?.login.user,
//             //     },
//             //   })
//             //   cache.evict({ fieldName: "posts:{}" })
//             // },
//           })
//           // if (response.data?.login.errors) {
//           //   setErrors(toErrorMap(response.data.login.errors))
//           // } else if (response.data?.login.user) {
//           // if (typeof router.query.next === "string") {
//           // router.push(router.query.next)
//           // } else {
//           // worked
//           // router.push("/")
//           // }
//           // }
//         }}
//       >
//         {() => (
//           // {({ isSubmitting }) => (
//           <Form>
//             <InputField
//               name="usernameOrEmail"
//               placeholder="username or email"
//               label="Username or Email"
//             />
//             <div>
//               <InputField
//                 name="password"
//                 placeholder="password"
//                 label="Password"
//                 type="password"
//               />
//             </div>
//             <div>
//               <link href="/forgot-password">
//                 <link>forgot password?</link>
//               </link>
//             </div>
//             <button
//               type="submit"
//               // isLoading={isSubmitting}
//             >
//               login
//             </button>
//           </Form>
//         )}
//       </Formik>
//   )
// }

// export default withApollo({ ssr: false })(Login)

import { Controller, useForm } from "react-hook-form"
import { SelectField, SwitchField, inputField } from "../components"

import { Button } from "antd"
import React from "react"

export const Login = (props: any) => {
  const { handleSubmit, control, errors, reset } = useForm()
  const type = ["Student", "Developer", "other"]

  const onSubmit = (data: any) => {
    console.log(data)
    setTimeout(
      () =>
        reset({
          FirstName: "",
          LastName: "",
          Email: "",
        }),
      1000
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <label className="label">Firstname</label>
        <Controller
          as={inputField("FirstName")}
          name="FirstName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.FirstName && (
          <span className="error">This field is required</span>
        )}
      </div>
      <div className="input-group">
        <label className="label">LastName</label>
        <Controller
          as={inputField("LastName")}
          name="LastName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.LastName && (
          <span className="error">This field is required</span>
        )}
      </div>
      <div className="input-group">
        <label className="label">Email</label>
        <Controller
          as={inputField("Email")}
          name="Email"
          control={control}
          defaultValue=""
          rules={{
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            required: true,
          }}
        />
        {errors.Email && (
          <span className="error">Please add a valid email</span>
        )}
      </div>
      <div className="input-group">
        <label className="label">Type of user</label>
        <Controller
          as={SelectField(type[0], type)}
          name="type"
          control={control}
          defaultValue={type[0]}
          rules={{
            required: true,
          }}
        />
      </div>
      <div className="input-group">
        <label className="label">Want to suscribe to our journal?</label>
        <Controller
          as={SwitchField()}
          name="subscription"
          control={control}
          defaultValue={true}
        />
      </div>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </form>
  )
}
