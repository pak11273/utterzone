import { AdHeader } from "../components"
import { Link } from "react-router-dom"
import React from "react"

export const Home = (props: any) => {
  return (
    <>
      <AdHeader />
      <div className="home">
        <div className="home_container">
          <h1>Welcome to Utterzone</h1>
          <h2>Learn to speak a new language</h2>
          <div className="home_guides">
            <h2>Guides</h2>
            <section>
              <div>
                <Link to="#">Utterzone Tutorials</Link>
              </div>
              <div>
                <Link to="#">Chat Etiquette</Link>
              </div>
              <div>
                <Link to="#">Learning Efficiently</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
