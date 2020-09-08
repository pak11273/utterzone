import React from "react"
import ReactPlayer from "react-player"

interface indexProps {
  playing: boolean
}

export const ZoneMain: React.FC<indexProps> = ({ playing }) => {
  return (
    <div className="player_wrapper">
      <ReactPlayer
        className="react_player"
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        playing={playing}
      />
    </div>
  )
}
