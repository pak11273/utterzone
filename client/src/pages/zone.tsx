import { Col, Row } from "antd"

import { Chat } from "../components"
import React from "react"

interface zoneProps {}

export const Zone: React.FC<zoneProps> = () => {
  return (
    <div style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col span={17} style={{ background: "green", height: "100%" }}>
          <h1>Zone</h1>
        </Col>
        <Col span={7} style={{ height: "100%" }}>
          <Chat />
        </Col>
      </Row>
    </div>
  )
}
