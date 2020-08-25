import { Button, Form, Input } from "antd"
import React, { useState } from "react"

import { useForgotPasswordMutation } from "../generated/graphql"

interface forgotPasswordProps {}

export const ForgotPassword: React.FC<forgotPasswordProps> = () => {
  const [complete, setComplete] = useState("")
  const [forgotPassword, { loading }] = useForgotPasswordMutation()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    const response = await forgotPassword({ variables: values })
    if (response.data?.forgotPassword) {
      setComplete("Please check your email")
    }
  }
  return (
    <section className="userform_section">
      <div className="user_form">
        <Form layout="vertical" form={form} name="register" onFinish={onFinish}>
          <Form.Item
            name="email"
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
          <Button
            style={{ marginTop: "20px" }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            forgot password
          </Button>
        </Form>
        <h1>{complete}</h1>
      </div>
    </section>
  )
}
