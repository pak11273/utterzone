import { Button, Row } from "antd"
import { Controller, useForm } from "react-hook-form"

import { InputField } from "../components"
import React from "react"

export const Login = (props: any) => {
  const { handleSubmit, control, errors, reset } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    setTimeout(
      () =>
        reset({
          FirstName: "",
          UserName: "",
          email: "",
        }),
      1000
    )
  }
  return (
    <Row justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label className="label">username</label>
          <Controller
            as={InputField("UserName")}
            name="UserName"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.UserName && (
            <span className="error">This field is required</span>
          )}
        </div>
        <div className="input-group">
          <label className="label">email</label>
          <Controller
            as={InputField("email")}
            name="email"
            control={control}
            defaultValue=""
            rules={{
              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              required: true,
            }}
          />
          {errors.email && (
            <span className="error">Please add a valid email</span>
          )}
        </div>
        {/* <div className="input-group">
          <label className="label">Remember Me</label>
          <Controller
            as={SwitchField()}
            name="rememberme"
            control={control}
            defaultValue={true}
          />
        </div> */}
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </form>
    </Row>
  )
}
