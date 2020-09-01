import { ApolloProvider } from "@apollo/react-hooks"
import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import { mockApolloClient } from "./test-helpers"

test("renders learn react link", () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

it("renders without crashing", () => {
  const client = mockApolloClient()
  const div = document.createElement("div")

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
