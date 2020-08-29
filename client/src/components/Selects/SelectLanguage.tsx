import React from "react"
import { Select } from "antd"

const { Option } = Select

interface SelectLanguageProps {}

export const SelectLanguage: React.FC<SelectLanguageProps> = () => {
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
  return (
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
  )
}
