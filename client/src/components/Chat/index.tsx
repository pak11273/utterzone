import { Gravatar } from "../../components"
import { Message } from "./Message"
import { MoreOutlined } from "@ant-design/icons"
import React from "react"

interface indexProps {}

const Message2 = () => {
  return (
    <>
      <div className="chat_message">
        <div className="chat_avatar">
          <Gravatar />
        </div>
        <p>blah!!! Foo!!!kk</p>
        <MoreOutlined style={{ fontSize: "20px" }} />
      </div>
    </>
  )
}

export const Chat: React.FC<indexProps> = () => {
  return (
    <div className="chat_container">
      <div className="chat_header"> Header </div>
      <div className="chat_message--container">
        <Message2 />
        {[1, 1, 1, 1, 1, 1, 1].map((x, i) => (
          <div key={i}>
            <Message />
          </div>
        ))}
        <Message2 />
      </div>
    </div>
  )
}
