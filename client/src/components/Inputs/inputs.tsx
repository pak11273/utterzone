import { Input, Select, Switch } from "antd"

import React from "react"

const { Option } = Select

export const inputField = (placeholder: any) => {
  return <Input placeholder={placeholder} />
}

export const SelectField = (defaultValue: any, values: any) => {
  return (
    <Select defaultValue={defaultValue} style={{ width: 120 }}>
      {values.map((value: any, index: any) => {
        return (
          <Option value={value} key={index}>
            {value}
          </Option>
        )
      })}
    </Select>
  )
}

export const SwitchField = () => {
  return <Switch defaultChecked style={{ maxWidth: 50 }} />
}
