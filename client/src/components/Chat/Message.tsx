import { Gravatar } from "../../components"
import { MoreOutlined } from "@ant-design/icons"
import React from "react"

interface MessageProps {
  msg: string
  username: string
}

export const Message: React.FC<MessageProps> = ({ msg, username }) => {
  return (
    <>
      <div className="chat_message">
        <div className="chat_avatar">
          <Gravatar /> <span>{username}</span>
        </div>
        <p>{msg}</p>
        <MoreOutlined style={{ fontSize: "20px" }} />
      </div>
    </>
  )
}
