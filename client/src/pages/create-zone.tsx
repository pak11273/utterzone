import { Button, Checkbox, Form, Input, Select } from "antd"
import React, { useState } from "react"
import { gql, useQuery } from "@apollo/client"

import { useHistory } from "react-router-dom"

// import { toErrorMap } from "../utils/toErrorMap"

const { Option } = Select

interface CreateZoneProps {}

// const ME = gql`
//   query {
//     me @client {
//       id
//       username
//     }
//   }
// `

export const CreateZone: React.FC<CreateZoneProps> = () => {
  // const { data } = useQuery(ME, {})
  const history = useHistory()
  const [privateZone, setPrivate] = useState(false)
  const [values, setValues] = useState({} as any)
  // console.log("me: ", data?.me?.id)

  const onFinish = async (values: any) => {
    if (values) {
      setValues({
        ...values,
        name: values.name,
        password: "xyz",
        maxParticipants: 36.0,
        description: "test",
        premium: false,
        public: true,
        mature: true,
      })
    }
    history.push("/zone/thing/foo")
  }

  const formItemLayout = {}
  const [form] = Form.useForm()

  return (
    <section className="userform_section">
      <div className="user_form">
        <h1>Create a Zone</h1>
        <Form
          {...formItemLayout}
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Zones require names",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nativeLanguage"
            label="Native Language"
            rules={[{ required: true }]}
          >
            <Select
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <>
                {["English", "Korean", "Spanish"].map((lang, i) => (
                  <Option key={i} value={`${lang}`}>
                    {lang}
                  </Option>
                ))}
              </>
            </Select>
          </Form.Item>
          <Form.Item
            name="learningLanguage"
            label="Learning Language"
            rules={[{ required: true }]}
          >
            <Select
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <>
                {["English", "Korean", "Spanish"].map((lang, i) => (
                  <Option key={i} value={`${lang}`}>
                    {lang}
                  </Option>
                ))}
              </>
            </Select>
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Form.Item name="mature" valuePropName="Mature">
              <Checkbox>18+</Checkbox>
            </Form.Item>

            <Form.Item name="public" valuePropName="Private">
              <Checkbox onChange={() => setPrivate(!privateZone)}>
                Private
              </Checkbox>
            </Form.Item>
          </div>
          {privateZone ? (
            <>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Passwords required for private zones",
                  },
                ]}
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
            </>
          ) : null}
          <Form.Item>
            <Button
              style={{ margin: "20px 0 0 6px" }}
              type="primary"
              htmlType="submit"
              // loading={loading}
            >
              Create Zone
            </Button>
          </Form.Item>
        </Form>
        <h1 style={{ marginTop: "10px", color: "red" }}>
          Pending Success/Error Messages
        </h1>
      </div>
    </section>
  )
}
