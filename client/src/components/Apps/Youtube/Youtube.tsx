import React from "react"
import ReactPlayer from "react-player"
import { YTControls } from "./YTControls"

interface YoutubeProps {
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export const Youtube: React.FC<YoutubeProps> = ({ setPlaying, playing }) => {
  return (
    <>
      <div className="player_wrapper">
        <ReactPlayer
          className="react_player"
          width="100%"
          height="100%"
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          playing={playing}
        />
      </div>
      <YTControls setPlaying={setPlaying} />
    </>
  )
}
