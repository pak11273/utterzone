import { Chat, Notebook, ZoneControls, ZoneMain } from "../components"
import { Col, Row } from "antd"
import React, { useState } from "react"

import { useCreateZoneSubscriptionSubscription } from "../generated/graphql"
import { useParams } from "react-router-dom"

// import { loader } from "graphql.macro"

// import { useQuery } from "@apollo/client"

// import { useParams } from "react-router-dom"

// const ZONE_QUERY = loader("../graphql/queries/zone.graphql")
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
  const [chat] = useState<OptionalZoneQueryResult>(null)
  // const { loading, error, data } = useQuery(ZONE_QUERY, {
  //   variables: { id: 1 },
  // })
  // let { id } = useParams()
  // if (!data || !data.zone) {
  //   console.log("no zone loaded!")
  // }

  // useEffect((data?: any) => {
  //   setChat(!data ? null : data)
  // }, [])
  // if (loading) return "Loading..."
  // if (error) return `Error! ${error.message}`
  const params: any = useParams()

  const { data, loading, error } = useCreateZoneSubscriptionSubscription({
    variables: { name: params.id },
  })

  if (error) console.log("ERROR: ", error)

  return (
    <div style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col className="zone_content" xs={24} md={17}>
          <ZoneMain />
          {"ifyouarethehost" ? <ZoneControls /> : null}
          <Notebook />
        </Col>
        <Col xs={24} md={7} style={{ height: "100%" }}>
          <Chat data={data} chatFetched={!chat ? undefined : chat} />
        </Col>
      </Row>
    </div>
  )
}
