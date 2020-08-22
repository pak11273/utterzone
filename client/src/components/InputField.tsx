import React, { InputHTMLAttributes } from "react"

import { useField } from "formik"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  textarea?: boolean
}

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props)
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} {...props} id={field.name} />
      {error ? <div>{error}</div> : null}
    </div>
  )
}
