import { Button, Input } from "antd"
import React, { useEffect, useState } from "react"

import { Message } from "./Message"
import { SendOutlined } from "@ant-design/icons"

// import { Gravatar } from "../../components"

interface indexProps {
  chat?: object
}

interface messageInterface {
  id: number | string
  name: string
  message: string
  avatar?: string
}

interface chatInterface {
  id: number
  name: string
  messages: Array<messageInterface>
}

type chatResult = chatInterface | null

export const Chat = ({ chatFetched }: any) => {
  const [chat, setChat] = useState<chatResult | any>({ messages: [] })
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (chatFetched) {
      setChat(chatFetched)
    }
  }, [chatFetched])

  const handleMessages = (e: any) => {
    chat!.messages.push({ id: chat.id, name: chat.name, message })

    let newChat = {
      ...chat,
      messages: chat!.messages,
    }
    setChat(newChat)

  }

  const handleMessage = (e: any) => {
    setMessage(e.target.value)
  }

  const handleKeyPress = (e: any) => {
    if (e.charCode === 13) {
      handleMessages(e)
    }
  }

  useEffect(() => {
    // useState callback: https://stackoverflow.com/questions/54954091/how-to-use-callback-with-usestate-hook-in-react
    var out = document.getElementById("out")
    out!.scrollTop = out!.scrollHeight - out!.clientHeight
    setMessage("")
  }, [chat])

  useEffect(() => {
    var out = document.getElementById("out")
    // scroll to bottom: https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
    // var c = 0
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
        {chat
          ? chat.messages.map((user: any, i: number) => (
              <div key={i}>
                <div>{user.name}</div>
                <Message msg={user.message} />
              </div>
            ))
          : null}
      </div>
      <div className="chat_message--ctrls">
        <div
          style={{
            display: "flex",
            width: "90%",
          }}
        >
          <Input
            className="chat_message--input"
            id="chat_message--input"
            placeholder="Type Here"
            onChange={(e: any) => handleMessage(e)}
            onKeyPress={handleKeyPress}
            value={message}
          ></Input>
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined style={{ paddingLeft: "1px" }} />}
            size="small"
            style={{ margin: "14px 10px 0 0" }}
            value={message}
            onClick={e => handleMessages(e)}
            disabled={!message}
          />
        </div>
        <Button
          type="primary"
          size="middle"
          style={{ width: "100px", margin: "10px" }}
          onClick={() => alert("audio")}
        >
          Send Audio
        </Button>
      </div>
    </div>
  )
}
