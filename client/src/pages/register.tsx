import { Button, Row } from "antd"
import { Controller, useForm } from "react-hook-form"

import React from "react"
import { inputField } from "../components"

// import { useRegisterMutation } from "../generated/graphql"

// import { withApollo } from "../utils/withApollo"

interface registerProps {}

export const Register: React.FC<registerProps> = () => {
  // const [register] = useRegisterMutation()
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
            as={inputField("UserName")}
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
            as={inputField("email")}
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
        <div className="input-group">
          <label className="label">password</label>
          <Controller
            as={inputField("password")}
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
        <div className="input-group">
          <label className="label">password confirmation</label>
          <Controller
            as={inputField("pwconfirm")}
            name="pwconfirm"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
          />
          {errors.password && (
            <span className="error">Password does not match</span>
          )}
        </div>
        {/* <div className="input-group">
          <label className="label">Terms & Conditions</label>
          <Controller
            as={SwitchField()}
            name="terms"
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
