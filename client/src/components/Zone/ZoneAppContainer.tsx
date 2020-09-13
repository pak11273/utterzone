import { Lobby, Youtube } from ".."

import React from "react"

interface indexProps {
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  app: {}
}

export const ZoneAppContainer: React.FC<indexProps> = ({
  setPlaying,
  playing,
  app,
}) => {
  let choice = <div></div>
  switch (app) {
    case "chat":
      choice = <Lobby />
      break
    case "youtube":
      choice = <Youtube playing={playing} setPlaying={setPlaying} />
      break
    default:
      choice = <Lobby />
  }
  return <div>{choice}</div>
}
