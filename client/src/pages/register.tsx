import { Button, Checkbox, Col, Form, Input, Row, Select, Tooltip } from "antd"
import { Controller, useForm } from "react-hook-form"
import React, { useState } from "react"

import { InputField } from "../components"
import { QuestionCircleOutlined } from "@ant-design/icons"

const { Option } = Select

// import { useRegisterMutation } from "../generated/graphql"
// const [register] = useRegisterMutation()

interface registerProps {}

export const Register: React.FC<registerProps> = () => {
  const { control, errors } = useForm()
  const formItemLayout = {
    // labelCol: {
    //   xs: { span: 24 },
    //   sm: { span: 8 },
    // },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 16 },
    // },
  }

  const tailFormItemLayout = {
    // wrapperCol: {
    //   xs: {
    //     span: 24,
    //     offset: 0,
    //   },
    //   sm: {
    //     span: 16,
    //     offset: 8,
    //   },
    // },
  }

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  )

  // const [autoCompleteResult, setAutoCompleteResult] = useState([])

  // const onWebsiteChange = (value: any) => {
  //   if (!value) {
  //     setAutoCompleteResult([])
  //   } else {
  //     setAutoCompleteResult(
  //       [".com", ".org", ".net"].map(domain => `${value}${domain}`)
  //     )
  //   }
  // }

  // const websiteOptions = autoCompleteResult.map(website => ({
  //   label: website,
  //   value: website,
  // }))

  return (
    <section className="logreg_section">
      <div className="logreg_form">
        <Form
          {...formItemLayout}
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
            name="username"
            label={
              <span>
                Username&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

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

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
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
            <div className="input-group">
              <Controller
                as={Input.Password}
                name="confirm"
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

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement"),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
