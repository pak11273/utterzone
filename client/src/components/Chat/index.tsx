import { Button, Input } from "antd"
import { MoreOutlined, SendOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"

import { Gravatar } from "../../components"
import { Message } from "./Message"

interface indexProps {}

interface messageInterface {
  msg: string
  id?: number
  avatar?: string
}

let messageList: messageInterface[] = [
  { msg: "hello", id: 1, avatar: "avatar.jpg" },
]

export const Chat: React.FC<indexProps> = () => {
  const [messages, setMessage] = useState<messageInterface[]>(messageList)
  const handleMessage = (e: any) => {
    console.log("e: ", e.target)
    setMessage([...messages, { msg: "hello foo" }])
  }

  useEffect(() => {
    // useState callback: https://stackoverflow.com/questions/54954091/how-to-use-callback-with-usestate-hook-in-react
    var out = document.getElementById("out")
    out!.scrollTop = out!.scrollHeight - out!.clientHeight
  }, [messages])

  useEffect(() => {
    var out = document.getElementById("out")
    // scroll to bottom: https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
    var c = 0
    var add = setInterval(function () {
      if (out) {
        // allow 1px inaccuracy by adding 1
        var isScrolledToBottom =
          out!.scrollHeight - out!.clientHeight <= out!.scrollTop + 1
        // TODO:auto insert messages for testing, remove later
        // var newElement = document.createElement("div")
        // newElement.innerHTML = (c++).toString()
        // out!.appendChild(newElement)
        // scroll to bottom if isScrolledToBotto
        if (isScrolledToBottom)
          out!.scrollTop = out!.scrollHeight - out!.clientHeight
      }
    }, 1000)
    return () => {
      clearInterval(add)
    }
  }, [])

  return (
    <div className="chat_container">
      <div className="chat_header"> Chat </div>
      <div className="chat_message--container" id="out">
        {messages.map((msg, i) => (
          <div key={i}>
            <Message msg={msg.msg} />
          </div>
        ))}
      </div>
      <div className="chat_message--ctrls">
        <div
          style={{
            display: "flex",
            width: "90%",
          }}
        >
          <Input placeholder="Type Here" style={{ margin: "10px" }} />
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined style={{ paddingLeft: "1px" }} />}
            size="small"
            style={{ margin: "14px 10px 0 0" }}
            onClick={e => handleMessage(e)}
          />
        </div>
        <Button
          type="primary"
          size="middle"
          style={{ width: "100px", margin: "10px" }}
        >
          Send Audio
        </Button>
      </div>
    </div>
  )
}
