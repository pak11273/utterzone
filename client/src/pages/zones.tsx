// import { MeDocument, MeQuery } from "../generated/graphql"

// import { Form } from "antd"

import React from "react"

// import { useHistory } from "react-router-dom"

// import { register } from "../serviceWorker"
// import { toErrorMap } from "../utils/toErrorMap"

interface zonesProps {}

export const Zones: React.FC<zonesProps> = () => {
  // const history = useHistory()
  // const [form] = Form.useForm()

  // const onFinish = async (values: any) => {
  //   delete values.confirm
  //   delete values.agreement
  //   if (values) {
  //     const response = await register({
  //       variables: { options: values },
  //       update: (cache, { data }) => {
  //         cache.writeQuery<MeQuery>({
  //           query: MeDocument,
  //           data: {
  //             __typename: "Query",
  //             me: data?.register.user,
  //           },
  //         })
  //       },
  //     })
  //     if (response.data?.register.errors) {
  //       const errorMap = toErrorMap(response.data?.register.errors)
  //       form.setFields(errorMap)
  //     } else {
  //       history.push("/")
  //     }
  //   }
  // }

  // const onFinishFailed = ({
  //   values,
  //   errorFields,
  //   outOfDate,
  // }: {
  //   values: any
  //   errorFields: any
  //   outOfDate: any
  // }) => {
  //   console.log("val: ", values)
  //   console.log("errors: ", errorFields)
  //   console.log("out: ", outOfDate)
  // }

  return (
    <section className="userform_section">
      <div className="user_form">
        <h1 style={{ textAlign: "center" }}>Zones</h1>
      </div>
    </section>
  )
}
