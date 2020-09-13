import { Button, Form, Input } from "antd"

import React from "react"
import { withApollo } from "../../utils/withApollo"

// import { useChangePasswordMutation } from "../../generated/graphql"


// import { useHistory } from "react-router-dom"

// import { InputField } from "../../components"
// import { QuestionCircleOutlined } from "@ant-design/icons"
// import { toErrorMap } from "../../utils/toErrorMap"

const ChangePassword: any = () => {
  // const router = useRouter()
  // const [changePassword] = useChangePasswordMutation()
  // const [tokenError, setTokenError] = useState("")
  // const history = useHistory()
  const [form] = Form.useForm()

  // TODO: implement loading
  const loading = false

  const onFinish = async (values: any) => {
    delete values.confirm
    delete values.agreement
    if (values) {
      try {
        console.log(values)
      } catch (err) {
        console.log(err)
      }
    }
  }
  // TODO: if no email was sent or token expired, also needs a rate limit
  // {tokenError ? (
  //   <div>
  //     <div>{tokenError}</div>
  //     <link href="/forgot-password">
  //       <link>click here to get a new one</link>
  //     </link>
  //   </div>
  // ) : null}

  // TODO: need hoooks implemented
  //   const response = await changePassword({
  //     variables: {
  //       newPassword: values.newPassword,
  //       token: "pending",
  //       //   typeof router.query.token === "string"
  //       //     ? router.query.token
  //       //     : "",
  //     },
  //     // update: ((cache: any), ({ data } = {data: any})) => {
  //     //   cache.writeQuery<MeQuery>({
  //     //     query: MeDocument,
  //     //     data: {
  //     //       __typename: "Query",
  //     //       me: data?.changePassword.user,
  //     //     },
  //     //   })
  //     // },
  //   })

  // TODO
  // if (response.data?.changePassword.errors) {
  //   const errorMap = toErrorMap(response.data.changePassword.errors)
  //   if ("token" in errorMap) {
  //     setTokenError(errorMap.token)
  //   }
  //   setErrors(errorMap)
  // } else if (response.data?.changePassword.user) {
  //   // worked
  //   // router.push("/")
  // }

  return (
    <section className="userform_section">
      <div className="user_form">
        <Form
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Input your new password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your new password",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  console.log(rule)
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  )
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ marginLeft: "6px" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Change Password
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </section>
  )
}

export default withApollo({ ssr: false })(ChangePassword)
