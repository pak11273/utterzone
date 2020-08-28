import { Button, Input } from "antd"
import { MoreOutlined, SendOutlined } from "@ant-design/icons"
import React, { useEffect } from "react"

import { Gravatar } from "../../components"
import { Message } from "./Message"

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
  useEffect(() => {
    // ref: https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
    var out = document.getElementById("out")
    console.log("out: ", out)
    var c = 0
    var add = setInterval(function () {
      console.log("scrollheight: ", out!.scrollHeight)
      console.log("clientheight: ", out!.clientHeight)
      console.log("scrolltop: ", out!.scrollTop)
      if (out) {
        // allow 1px inaccuracy by adding 1
        var isScrolledToBottom =
          out!.scrollHeight - out!.clientHeight <= out!.scrollTop + 1
        console.log(out!.scrollHeight - out!.clientHeight, out!.scrollTop + 1)
        var newElement = document.createElement("div")
        newElement.innerHTML = (c++).toString()
        out!.appendChild(newElement)
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
        <Message2 />
        {[1, 1, 1].map((x, i) => (
          <div key={i}>
            <Message />
          </div>
        ))}
        <Message2 />
        <Message2 />
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
