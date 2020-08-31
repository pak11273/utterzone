import React from "react"

interface indexProps {}

export const ZoneMain: React.FC<indexProps> = () => {
  return (
    <div id="HTML5Area">
      <div>
        <video
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          width="100%"
          height="100%"
          className="video_screen"
          id="html5src"
          controls
        >
          <source src="video/sintel-short.mp4" type="video/mp4" />
          <source src="video/sintel-short.webm" type="video/webm" />
        </video>
      </div>
    </div>
  )
}
