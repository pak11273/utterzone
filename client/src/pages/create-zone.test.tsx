import { BrowserRouter } from "react-router-dom"
import { CreateZone } from "./create-zone"
import { MockedProvider } from "@apollo/client/testing"
import React from "react"
import TestRenderer from "react-test-renderer"
import { Zones } from "../pages/zones"
import { loader } from "graphql.macro"

const createZoneMutation = loader("../graphql/mutations/createZone.graphql")

const mocks = [
  {
    request: {
      query: createZoneMutation,
    },
    result: {
      data: {
        createZone: { id: "1" },
      },
    },
  },
]

describe("create zones", () => {
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

  const CreatedZone = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <CreateZone />
      </BrowserRouter>
    </MockedProvider>
  )

  it("create a zone", () => {
    // create a zone and return a zone back
  })
})
