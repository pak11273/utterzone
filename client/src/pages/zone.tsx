import { Chat, ZoneControls, ZoneMain } from "../components"
import { Col, Row } from "antd"
import React, { useEffect, useState } from "react"

import { loader } from "graphql.macro"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"

const ZONE_QUERY = loader("../graphql/queries/zone.graphql")
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
  const [chat, setChat] = useState<OptionalZoneQueryResult>(null)
  const { loading, error, data } = useQuery(ZONE_QUERY, {
    variables: { id: 1 },
  })
  let { id } = useParams()
  console.log("id: ", id)
  console.log("data: ", data)

  useEffect(() => {
    setChat(
      !data ? null : data
      // {
      //   id: "1",
      //   name: "hello",
      //   messages: [
      //     {
      //       id: "1",
      //       name: "barney",
      //       message: "hello there foo foo!",
      //       createdAt: new Date(),
      //     },
      //   ],
      // }
    )
  }, [data])
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

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
          <Chat chatFetched={!chat ? undefined : chat} />
        </Col>
      </Row>
    </div>
  )
}
