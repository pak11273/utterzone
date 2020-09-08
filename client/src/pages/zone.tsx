/* eslint-disable @typescript-eslint/no-unused-vars */

import { Chat, Notebook, ZoneControls, ZoneMain } from "../components"
import { Col, Row } from "antd"
import React, { useEffect, useState } from "react"

import { useCreateZonePubSubscription } from "../generated/graphql"
import { useParams } from "react-router-dom"

interface ZoneQueryMessage {
  id: string
  name: string
  message: string
  createdAt: Date
}

interface ZoneQueryResult {
  id: string
  name: string
  messages: Array<ZoneQueryMessage>
}

interface zoneProps {
  id?: number
}

type OptionalZoneQueryResult = ZoneQueryResult | null

// export const Zone: React.FC<zoneProps> = ({ id }) => {
export const Zone: any = () => {
  const params: any = useParams()
  const [playing, setPlaying] = useState(false)
  const [chat] = useState<OptionalZoneQueryResult>(null)
  const { data, loading, error } = useCreateZonePubSubscription({
    variables: { token: params.token },
  })

  useEffect(() => {
    window.addEventListener("beforeunload", event => {
      event.returnValue = ""
    })
    return () => {
      window.removeEventListener("beforeunload", () => {})
    }
  }, [])

  return (
    <div style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col className="zone_content" xs={24} md={17}>
          <ZoneMain playing={playing} />
          {"ifyouarethehost" ? <ZoneControls playing={setPlaying} /> : null}
          <Notebook />
        </Col>
        <Col xs={24} md={7} style={{ height: "100%" }}>
          <Chat data={data} chatFetched={!chat ? undefined : chat} />
        </Col>
      </Row>
    </div>
  )
}
