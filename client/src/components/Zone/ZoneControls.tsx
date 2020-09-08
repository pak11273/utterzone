/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Input } from "antd"
import React, { useState } from "react"

interface ZoneControlsProps {
  playing: React.Dispatch<React.SetStateAction<boolean>>
}

export const ZoneControls: React.FC<ZoneControlsProps> = ({ playing }) => {
  const [play, setPlay] = useState(true)
  const roomnum = 1
  const playVideo = (num: number) => {
    console.log(num)
    setPlay(!play)
    playing(play)
  }
  const syncVideo = (num: number) => {
    console.log(num)
  }
  const changeHost = (num: number) => {
    console.log(num)
  }

  const enqueueVideoParse = (num: number) => {
    console.log(num)
  }

  const emptyQueue = (num: number) => {
    console.log(num)
  }

  const changeVideoParse = (num: number) => {
    console.log(num)
  }

  const prevVideo = (num: number) => {
    console.log(num)
  }

  const playNext = (num: number) => {
    console.log(num)
  }

  // const removeAt = (num: number) => {
  //   console.log(num)
  // }
  return (
    <div className="zone_controls">
      <div style={{ textAlign: "center" }}>
        <Button
          id="playButton"
          onClick={() => playVideo(roomnum)}
          style={{ marginTop: ".5rem" }}
        >
          <i className="fa fa-play"></i> Play / <i className="fa fa-pause"></i>{" "}
          Pause
        </Button>

        {/* <Button
          id="syncbutton"
          onClick={() => syncVideo(roomnum)}
          style={{ marginTop: ".5rem" }}
        >
          <i className="fa fa-sync"></i> Sync
        </Button>

        <Button
          id="hostbutton"
          onClick={() => changeHost(roomnum)}
          style={{ marginTop: ".5rem" }}
        >
          <i className="fas fa-users"></i> Make me the host!
        </Button> */}
      </div>
      <div className="topbotmargins">
        {/* <Input
          type="Video"
          style={{
            maxWidth: "200px",
            marginRight: ".5rem",
            marginBottom: ".5rem",
            float: "left",
          }}
          className="form-control"
          id="inputVideoId"
          placeholder="Video ID / URL"
        /> */}
        {/* <Button
          id="enqueueButton"
          onClick={() => enqueueVideoParse(roomnum)}
          className="btn btn-primary"
        >
          <i className="fas fa-plus"></i> Add to Queue
        </Button> */}
        {/* <button
          id="emptyButton"
          onClick={() => emptyQueue(roomnum)}
          className="btn btn-primary"
        >
          <i className="fas fa-trash"></i> Empty Queue
        </button> */}
        {/* <!-- <a className="ghost-button-full-color"><i className="far fa-times-circle"></i></a> --> */}
        {/* <Button
          id="changeButton"
          onClick={() => changeVideoParse(roomnum)}
          className="btn btn-primary"
        >
          <i className="fas fa-exchange-alt"></i> Change Video
        </Button> */}
        {/* <Button
          id="previousButton"
          onClick={() => prevVideo(roomnum)}
          className="btn btn-primary"
        >
          <i className="fas fa-step-backward"></i> Previous
        </Button> */}
        {/* <button
          id="nextButton"
          onClick={() => playNext(roomnum)}
          className="btn btn-primary"
        >
          <i className="fas fa-step-forward"></i> Next
        </button> */}

        <br />
      </div>
      {/* <!-- <input type="file" id="html5-input" /> -->
                    <!-- Playlist shit --> */}
      <div id="visual-queue" className="vid-list-container">
        <ul className="vid-list" id="vidlist">
          <li className="vid-item">
            {/* TODO: keep or no? */}
            {/* <div className="thumb">
                                    <a onClick={()=>removeAt(0)} className="ghost-button-full-color"><i className="far fa-times-circle"></i></a>
                                    <img src="http://img.youtube.com/vi/eg6kNoJmzkY/0.jpg" ></img>
                                </div>
                                <div className="desc">
                                    Jessica Hernandez & the Deltas - Dead Brains
                                </div>  */}
          </li>
        </ul>
      </div>
      <div id="queue-arrows" className="arrows">
        <div className="arrow-left">
          <i className="fa fa-chevron-left fa-lg"></i>
        </div>
        <div className="arrow-right">
          <i className="fa fa-chevron-right fa-lg"></i>
        </div>
      </div>
      <br />

      {/* <!-- HTML5 player input -->
                    <!-- <input type="file" id="html5-input" /> -->
                    <!-- <input type="Video" style={{max-width: 200px; margin-right: .5rem; margin-bottom: .5rem; float: left;" className="form-control" id="inputVideoURL" placeholder="Direct URL to .mp4/.webm"> -->

                    <!-- <p style={{display: none" id="html5-message" className="lead">Video File Upload Not Yet Supported</p> --> */}
      <p style={{ display: "none" }} id="beta-message" className="lead">
        Queue is currently only supported by YouTube
      </p>
    </div>
  )
}
