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
  mature: boolean
  premium: boolean
  name: string
  loading: boolean
  description: string | undefined
}) => (
  <Card
    loading={loading}
    cover={
      <>
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </>
    }
    actions={[<Link to={`/zone/${hostname}/${token}`}>Enter Zone</Link>]}
  >
    <Meta
      app={`${app}`}
      title={`${name}`}
      description={`${description}`}
      mature={mature}
      premium={premium}
    />
    <TeamOutlined key="setting" />
    <span>{30}</span>
  </Card>
)
