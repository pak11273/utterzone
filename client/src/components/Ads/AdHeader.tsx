import { PageHeader } from "antd"
import React from "react"

interface AdHeaderProps {}

export const AdHeader: React.FC<AdHeaderProps> = () => {
  return (
    <PageHeader
      className="site-page-header"
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
    />
  )
}
