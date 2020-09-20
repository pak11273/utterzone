import "reflect-metadata"

import { Connection } from "typeorm"
import { User } from "../../entities/User"
import faker from "faker"
import { gCall } from "../utils/gCall"
import { testConn } from "../utils/testConn"

let conn: Connection

beforeAll(async () => {
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
})

const meQuery = `
  {
    me {
      id
      username
      email
    }
  }
`

describe("me", () => {
  it("fetches me", async () => {
    const user = await User.create({
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save()

    const response = await gCall({
      source: meQuery,
      userId: user.id,
    })
    expect(response).toEqual({
      data: {
        me: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
    })
  })

  it("returns null if user isn't in context", async () => {
    const response = await gCall({
      source: meQuery,
    })

    expect(response).toEqual({
      data: {
        me: null,
      },
    })
  })
})
