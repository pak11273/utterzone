import { Alert } from "antd"
import React from "react"

interface AnnouncementProps {}

export const Announcement: React.FC<AnnouncementProps> = () => {
  return (
    <Alert
      message="Informational Notes"
      type="info"
      showIcon
      closable
      className="announcement"
    />
  )
}
