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
  const { data, loading } = useZonesQuery()

  useEffect((): void => {
    if (!data || !data.zones) {
      console.log("no zones loaded!")
    }
    console.log("data: ", data)
  }, [data])

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
            <Col xs={24} md={4}>
              I speak: English
            </Col>
            <Col xs={24} md={4}>
              Learning: Korean
            </Col>
            <Col xs={24} md={4}>
              Participants: High to Low
            </Col>
            <Col xs={24} md={4}>
              App: Youtube
            </Col>
            <Col xs={24} md={4}>
              Mature Zone
            </Col>
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
                      hostname={x.hostname}
                      token={x.token}
                      premium={x.premium}
                      mature={x.mature.toString()}
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
