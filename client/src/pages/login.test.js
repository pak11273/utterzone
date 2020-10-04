import { fireEvent, render, screen } from "@testing-library/react"

import { BrowserRouter } from "react-router-dom"
import { Login } from "./login.tsx"
import { MockedProvider } from "@apollo/client/testing"
import React from "react"
import TestRenderer from "react-test-renderer"
import { loader } from "graphql.macro"
import puppeteer from "puppeteer"

const login = loader("../graphql/mutations/login.graphql")

// The component AND the query need to be exported

const mocks = [
  {
    request: {
      query: login,
      variables: {
        username: "Buck",
        email: "blah",
        password: "alsdfkjlasfjldas",
      },
    },
    result: {
      data: {
        dog: { id: "1", name: "Buck", breed: "bulldog" },
      },
    },
  },
]

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

describe("/login", () => {
  const LoginComponent = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </MockedProvider>
  )
  const comp = TestRenderer.create(LoginComponent)

  it("render without crashing and match its snapshot", () => {
    let tree = comp.toJSON()
    expect(tree).toMatchSnapshot()
  })

  // api calls

  // validations
  // it("should return error with blank email or blank password", async () => {
  //   const browser = await puppeteer.launch()
  //   const page = await browser.newPage()
  //   await page.goto("http://localhost:3000/login")
  //   await page.type(".user_form", "")
  //   await page.click('button[type="submit"]')
  //   await page.waitForSelector(".ant-form-item-explain")
  //   const html = await page.$eval(".ant-form-item-explain", e => e.innerText)
  //   expect(html).toBe("Please input your E-mail!")
  //   await page.close()
  //   browser.close()
  // })

  // it("should return an error if a NON valid email is input", async () => {
  //   const browser = await puppeteer.launch()
  //   const page = await browser.newPage()
  //   await page.goto("http://localhost:3000/login")
  //   await page.type(".user_email", "blahblah.com")
  //   await page.click('button[type="submit"]')
  //   await page.waitForSelector(".ant-form-item-explain:nth-child(2)")
  //   // await page.waitForSelector(".user_form_items:nth-child(1)")
  //   //   await page.waitForSelector(".user_form_items > .user_password")
  //   const html = await page.$eval(".ant-form-item-explain", e => e.innerText)
  //   expect(html).toBe("The input is not valid E-mail!")
  //   await page.close()
  //   browser.close()
  // })

  // it("should return an error if a NON valid password is input", async () => {
  //   const browser = await puppeteer.launch()
  //   const page = await browser.newPage()
  //   await page.goto("http://localhost:3000/login")
  //   await page.type(".user_password", "")
  //   await page.click('button[type="submit"]')
  //   await page.waitForSelector(".user_form_items > .user_password")
  //   const html = await page.$eval(".ant-form-item-explain", e => e.innerText)
  //   expect(html).toBe("Please input your Password!")
  //   await page.close()
  //   browser.close()
  // })
})
