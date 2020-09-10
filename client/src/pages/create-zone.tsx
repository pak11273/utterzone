/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd"
import React, { useState } from "react"
import { cache, client } from "../apollo/apollo"
import { gql, useLazyQuery } from "@apollo/client"

import { loader } from "graphql.macro"
import { useCreateZoneMutation } from "../generated/graphql"
import { useHistory } from "react-router-dom"
import { v4 } from "uuid"

const CREATE_ZONE = loader("../graphql/mutations/createZone.graphql")
const Me = loader("../graphql/queries/me.graphql")

// import { toErrorMap } from "../utils/toErrorMap"

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 24 },
}

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
}

const { Option } = Select

interface CreateZoneProps {}

const CACHE_ME = gql`
  query {
    Me {
      id
      username
    }
  }
`

const tips = "Max 30 people.  May vary with apps."

export const CreateZone: React.FC<CreateZoneProps> = () => {
  const history = useHistory()
  const [privateZone, setPrivate] = useState(false)
  const [getMe, { data: me }] = useLazyQuery(CACHE_ME)
  const [
    createZoneMutation,
    { data: zoneData, loading },
  ] = useCreateZoneMutation()

  // TODO: created zone should return all fields
  console.log("dat: ", zoneData)

  cache.writeQuery({
    query: Me,
    data: {
      isLoggedIn: !!localStorage.getItem("uzid"),
    },
  })

  console.log("me: ", me)

  const onFinish = async (values: any) => {
    if (values) {
      values.hostname = "blah"

      try {
        const response = await createZoneMutation({
          variables: { input: values },
        })
        console.log("zone: ", zoneData)
        console.log("res: ", response)

        if (response) {
          history.push(
            `/zone/${response.data?.createZone.id}/${response.data?.createZone.token}`
          )
        }
      } catch (err) {
        console.log("catch: ", err)
      }
    }
    const token = v4()
    console.log("values: ", values)
    // if (!data?.me) {
    //   alert("you must be logged in")
    // } else {
    //   history.push(`/zone/${values.name}/${token}`)
    // }
  }

  const [form] = Form.useForm()

  return (
    <section className="userform_section">
      <div className="user_form">
        <h1>Create a Zone</h1>
        <Form
          validateMessages={validateMessages}
          {...layout}
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          initialValues={{
            maxParticipants: 30,
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Zones require names",
              },
              {
                min: 8,
                message: "Must be a min of 8 chars",
              },
              {
                max: 24,
                message: "Must be a max of 24 chars",
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
          <Form.Item
            name="maxParticipants"
            label="Zone Max"
            help={tips}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <InputNumber min={1} max={30} />
          </Form.Item>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Form.Item
              name="public"
              valuePropName="Private"
              labelAlign="right"
              style={{ marginRight: "40px" }}
            >
              <Checkbox onChange={() => setPrivate(!privateZone)}>
                Private
              </Checkbox>
            </Form.Item>
            <Form.Item name="mature" valuePropName="Mature" labelAlign="right">
              <Checkbox>18+</Checkbox>
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
              loading={loading}
              onClick={() => getMe()}
            >
              Create Zone
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
