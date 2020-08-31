import { Button, Checkbox, Form, Input, Tooltip } from "antd"
import {
  MeDocument,
  MeQuery,
  useCreateUserMutation,
} from "../generated/graphql"

import { QuestionCircleOutlined } from "@ant-design/icons"
import React from "react"
import { toErrorMap } from "../utils/toErrorMap"
import { useHistory } from "react-router-dom"

// const { Option } = Select

interface registerProps {}

export const Register: React.FC<registerProps> = () => {
  const [register, { loading }] = useCreateUserMutation()
  const history = useHistory()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    delete values.confirm
    delete values.agreement
    if (values) {
      try {
        const response = await register({
          variables: { input: values },
          update: (cache, { data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data?.createUser.user,
              },
            })
          },
        })
        if (response.data?.createUser.errors) {
          console.log("hi")
          const errorMap = toErrorMap(response.data?.createUser.errors)
          form.setFields(errorMap)
        } else {
          history.push("/")
        }
      } catch (err) {
        console.log("err err err: ", err)
        const errorMap = toErrorMap([
          { field: "username", message: err.message },
        ])
        console.log("map: ", errorMap)
        form.setFields(errorMap)
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
    <section className="userform_section">
      <div className="user_form">
        <Form
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
            <Input.Password />
          </Form.Item>
          <div style={{ marginLeft: "6px" }}>
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
                I have read the <a href="/agreement">Terms & Conditions</a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Register
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </section>
  )
}
