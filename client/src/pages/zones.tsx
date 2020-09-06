// import { MeDocument, MeQuery } from "../generated/graphql"

// import { Form } from "antd"

import { Col, Row } from "antd"
import React, { useEffect } from "react"

import { Button } from "antd"
import { ZoneCard } from "../components"
import { useZonesQuery } from "../generated/graphql"

// import { useHistory } from "react-router-dom"

// import { register } from "../serviceWorker"
// import { toErrorMap } from "../utils/toErrorMap"

interface zonesProps {}

// const { Meta } = Card

export const Zones: React.FC<zonesProps> = () => {
  // const history = useHistory()
  // const [form] = Form.useForm()
  const { data, loading } = useZonesQuery({
    variables: {},
    fetchPolicy: "no-cache",
  })

  // if (loading) {
  //   setLoading(true)
  // }

  useEffect(data => {
    if (!data || !data.zones) {
      console.log("no zones loaded!")
    }
  }, [])

  // const onFinish = async (values: any) => {
  // if (values) {
  //   const response = await register({
  //     variables: { options: values },
  //     update: (cache, { data }) => {
  //       cache.writeQuery<MeQuery>({
  //         query: MeDocument,
  //         data: {
  //           __typename: "Query",
  //           me: data?.register.user,
  //         },
  //       })
  //     },
  //   })
  //   if (response.data?.register.errors) {
  //     const errorMap = toErrorMap(response.data?.register.errors)
  //     form.setFields(errorMap)
  //   } else {
  //     history.push("/")
  //   }
  // }
  // }
  console.log("data: ", data)

  return (
    <section className="userform_section">
      <div className="zones_container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Filters</h1>
          <Row gutter={[24, 32]}>
            <Col xs={24}>I speak: English</Col>
            <Col xs={24}>Learning: Korean</Col>
            <Col xs={24}>Participants: High to Low</Col>
            <Col xs={24}>App: Youtube</Col>
            {/* <Col xs={24}>Mature Zone</Col> */}
          </Row>
          <Button size="small" type="primary" style={{ width: "100px" }}>
            Select
          </Button>
        </div>
        <Row gutter={[24, 32]}>
          {data
            ? data?.zones.map((x, i) => {
                return (
                  <Col key={i} xs={24} sm={18} md={12} lg={6} xl={4}>
                    <ZoneCard
                      app={x.app}
                      name={x.name}
                      loading={loading}
                      description={x.description}
                      hostId={x.hostId}
                      zoneId={x.zoneId}
                      premium={x.premium}
                      mature={x.mature}
                    />
                  </Col>
                )
              })
            : null}
        </Row>
      </div>
    </section>
  )
}
