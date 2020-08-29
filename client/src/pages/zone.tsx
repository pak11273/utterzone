import { Chat, ZoneControls, ZoneMain } from "../components"
import { Col, Row } from "antd"
import React, { useMemo, useState } from "react"

interface ZoneQueryMessage {
  id: string
  content: string
  createdAt: Date
}

interface ZoneQueryResult {
  id: string
  name: string
  messages: Array<ZoneQueryMessage>
}

interface zoneProps {
  id: string
}

type OptionalZoneQueryResult = ZoneQueryResult | null

export const Zone: React.FC<zoneProps> = ({ id }) => {
  const [zone, setZone] = useState<OptionalZoneQueryResult>(null)
  useMemo(async () => {
    const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getZoneQuery,
        variables: { id },
      }),
    })
    const {
      data: { zone },
    } = await body.json()
    setZone(zone)
  }, [id])

  if (!zone) return null
  return (
    <div style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col
          className="zone-content"
          span={17}
          style={{ background: "green", height: "100%", overflow: "scroll" }}
        >
          <ZoneMain />
          <ZoneControls />
        </Col>
        <Col span={7} style={{ height: "100%" }}>
          <Chat />
        </Col>
      </Row>
    </div>
  )
}
