import { Button, Form, Input } from "antd"
import { Controller, useForm } from "react-hook-form"

import React from "react"

// import { SwitchField } from "../components"

// const { Option } = Select
const formItemLayout = {}

export const Login = (props: any) => {
  // const { handleSubmit, control, errors, reset } = useForm()
  const { control, errors } = useForm()
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
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
    <section className="logreg_section">
      <div className="logreg_form">
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
            name="useremail"
            label="Username or E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your Username or E-mail!",
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
            <div className="input-group">
              <Controller
                as={Input.Password}
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
              />
              {errors.password && (
                <span className="error">Password must be at least 8 chars</span>
              )}
            </div>
          </Form.Item>
          {/* <Form.Item
            name="rememberme"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject("Remember Me"),
              },
            ]}
          >
            <div className="input-group">
              <label className="label">Remember Me</label>
              <Controller
                as={SwitchField()}
                name="rememberme"
                control={control}
                defaultValue={true}
              />
            </div>
          </Form.Item> */}
          <Form.Item style={{ marginLeft: "6px" }}>
            <Button type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
