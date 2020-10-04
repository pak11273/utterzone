import { BrowserRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import React from "react"
import TestRenderer from "react-test-renderer"
import { Zones } from "../pages/zones"
import { loader } from "graphql.macro"
import puppeteer from "puppeteer"

const zones = loader("../graphql/queries/zones.graphql")
// const login = loader("../graphql/mutations/login.graphql")
// fixes the window.matchMedia is not a function error
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => {
      return {
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }
    }),
  })
})

const mocks = [
  {
    request: {
      query: zones,
    },
    result: {
      data: {
        zones: { id: "1", name: "Buck", breed: "bulldog" },
      },
    },
  },
]

describe("/zones/all", () => {
  const ZonesComponent = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <Zones />
      </BrowserRouter>
    </MockedProvider>
  )
  const comp = TestRenderer.create(ZonesComponent)

  it("render without crashing and match its snapshot", () => {
    let tree = comp.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("should display text that no zones were found if response is empty", () => {})
})
