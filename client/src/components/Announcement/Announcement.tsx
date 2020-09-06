import React from "react"

interface AnnouncementProps {}

export const Announcement: React.FC<AnnouncementProps> = () => {
  return (
    <div
      style={{
        height: "30px",
        width: "100%",
        textAlign: "center",
        background: "tomato",
        color: "white",
        padding: "4px",
      }}
    >
      Announcements go here
    </div>
  )
}
