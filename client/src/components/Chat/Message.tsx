import { Gravatar } from "../../components"
import { MoreOutlined } from "@ant-design/icons"
import React from "react"

interface MessageProps {}

const message =
  "Maverick ​@Coder Foundry Do you agree with being passionate and obssesed about your product like steve jobs or be cash flow and stock value oriented like Tim cook im asking for your perspective/experience?"

export const Message: React.FC<MessageProps> = () => {
  return (
    <>
      <div className="chat_message">
        <div className="chat_avatar">
          <Gravatar />
        </div>
        <p>{message}</p>
        <MoreOutlined style={{ fontSize: "20px" }} />
      </div>
    </>
  )
}
