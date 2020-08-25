import { Button, Form, Input } from "antd"
import { Link, useHistory } from "react-router-dom"
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql"

import React from "react"
import { toErrorMap } from "../utils/toErrorMap"
import { withRouter } from "react-router-dom"

// import { SwitchField } from "../components"

// const { Option } = Select
const formItemLayout = {}

const Container = (props: any) => {
  const [login] = useLoginMutation()
  const history = useHistory()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    if (values) {
      const response = await login({
        variables: values,
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.login.user,
            },
          })
          cache.evict({ fieldName: "posts:{}" })
        },
      })
      if (response.data?.login.errors) {
        const errorMap = toErrorMap(response.data?.login.errors)
        form.setFields(errorMap)
      }
      if (response.data?.login.user) {
        history.push("/")
      }
    }
  }

  const onFinishFailed = ({
    values,
    errorFields,
    outOfDate,
  }: {
    values: any
    errorFields: any
    outOfDate: any
  }) => {
    console.log("val: ", values)
    console.log("errors: ", errorFields)
    console.log("out: ", outOfDate)
  }

  return (
    <section className="userform_section">
      <div className="user_form">
        <Form
          {...formItemLayout}
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="usernameOrEmail"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ margin: "20px 0 0 6px" }}
              type="primary"
              htmlType="submit"
            >
              Log In
            </Button>
            <Button type="link" htmlType="button">
              <Link to="/forgot-password">forgot password?</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}

export const Login = withRouter(Container)
