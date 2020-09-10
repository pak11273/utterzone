import { Card } from "antd"
import { Link } from "react-router-dom"
import React from "react"
import { TeamOutlined } from "@ant-design/icons"

const { Meta } = Card

export const ZoneCard = ({
  app,
  hostname,
  token,
  mature,
  name,
  premium,
  loading,
  description,
}: {
  app: string
  hostname: string
  token: string
  mature: string
  premium: boolean
  name: string
  loading: boolean
  description: string | undefined
}) => (
  <Card
    loading={loading}
    actions={[<Link to={`/zone/${hostname}/${token}`}>Enter Zone</Link>]}
  >
    {console.log("magure: ", typeof mature)}
    <Meta title={`${name}`} description={`${description}`} />
    <p>hosted by:{`${hostname}`}</p>
    <p>app: {`${app}`}</p>
    <p>{mature === "true" ? "18+" : "family friendly"}</p>
    <p>premium zone {`${premium}`}</p>
    <TeamOutlined key="setting" />
    <span>Max: {30}</span>
  </Card>
)
