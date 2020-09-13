import React from "react"

interface LobbyProps {}

export const Lobby: React.FC<LobbyProps> = () => {
  return (
    <div className="lobby">
      <div className="lobby_container">
        <h1>Welcome to Chat</h1>
        <div className="lobby_guides">
          <h2>Guides</h2>
          <section>
            <div>
              <div>Get Started</div>
            </div>
            <div>
              <div>Chat Etiquette</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
