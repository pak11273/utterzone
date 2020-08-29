import { Button, Checkbox, Form, Input, Select } from "antd"
import React, { useState } from "react"

import { Link } from "react-router-dom"
import { SelectLanguage } from "../components"

interface ZoneCreateProps {}
function onChange(value: any) {
  console.log(`selected ${value}`)
}

function onBlur() {
  console.log("blur")
}

function onFocus() {
  console.log("focus")
}

function onSearch(val: string) {
  console.log("search:", val)
}

export const PageZoneCreate: React.FC<ZoneCreateProps> = () => {
  const { Option } = Select
  const [privateZone, setPrivate] = useState(false)
  const formItemLayout = {}
  // const history = useHistory()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    if (values) {
      console.log("values: ", values)
    }
  }
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
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
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
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="english">English</Option>
              <Option value="korean">Korean</Option>
              <Option value="spanish">Spanish</Option>
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
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="english">English</Option>
              <Option value="korean">Korean</Option>
              <Option value="spanish">Spanish</Option>
            </Select>
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Form.Item name="mature" valuePropName="Mature">
              <Checkbox>18+</Checkbox>
            </Form.Item>

            <Form.Item name="private" valuePropName="Private">
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
