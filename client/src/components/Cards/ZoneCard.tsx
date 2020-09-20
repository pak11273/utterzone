import { Button, Card } from "antd"

import React from "react"
import { useHistory } from "react-router-dom"
import { useJoinZoneMutation } from "../../generated/graphql"

// import { loader } from "graphql.macro"

// const JOIN_ZONE = loader("../../graphql/mutations/joinZone.graphql")

// import { TeamOutlined } from "@ant-design/icons"

// const { Meta } = Card

export const ZoneCard = ({
  id,
  app,
  hostname,
  token,
  mature,
  name,
  premium,
  loading,
  description,
  maxParticipants,
}: {
  id: any
  app: string
  hostname: string
  token: string
  mature: string
  premium: boolean
  name: string
  loading: boolean
  description: string | null | undefined
  maxParticipants: number
}) => {
  const [joinZoneMutation] = useJoinZoneMutation({
    variables: { id: id },
  })
  const history = useHistory()
  const handleClick = async () => {
    const response = await joinZoneMutation()
    console.log(response)
    history.push(`/zone/${id}/${token}`)
  }

  return (
    <Card
      loading={loading}
      actions={[<Button onClick={() => handleClick()}>Enter Zone</Button>]}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
      style={{ overflow: "hidden" }}
      cover={<div className="zonecard_title">{`${name}`}</div>}
    >
      <p className="zonecard_description">{`${description}`}</p>
      <div className="zonecard_cols">
        <div className="zonecard_meta">
          <p className="zonecard_small_text">app</p>
          <p className="zonecard_big_text">{`${app}`}</p>
        </div>
        <div className="zonecard_meta">
          <p className="zonecard_small_text">rating</p>
          <p className="zonecard_big_text">{mature === "true" ? "18+" : "G"}</p>
        </div>
      </div>
      <div className="zonecard_cols">
        <div className="zonecard_meta">
          <p className="zonecard_small_text">type</p>
          <p className="zonecard_big_text">{`${
            premium ? premium : "regular"
          }`}</p>
        </div>
        <div className="zonecard_meta">
          <p className="zonecard_small_text">max</p>
          <p className="zonecard_big_text">
            {" "}
            {maxParticipants ? maxParticipants : 30}
          </p>
        </div>
      </div>
      <div className="zonecard_meta">
        <p className="zonecard_small_text">hosted by</p>
        <p className="zonecard_hostname">{`${hostname}`}</p>
      </div>
    </Card>
  )
}
