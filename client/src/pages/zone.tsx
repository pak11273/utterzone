import { Col, Row } from "antd"

import { Chat } from "../components"
import React from "react"

interface zoneProps {}

export const Zone: React.FC<zoneProps> = () => {
  return (
    <div style={{ background: "yellow", height: "100%" }}>
      <Row style={{ background: "yellow" }}>
        <Col span={12} style={{ background: "green", minHeight: "100%" }}>
          <h1>Zone</h1>
        </Col>
        <Col span={12} style={{ background: "tomato", minHeight: "100%" }}>
          <Chat />
        </Col>
      </Row>
    </div>
  )
}
