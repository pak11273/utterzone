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

const createUserMutation = `
  mutation createUser($input: UsernamePasswordInput!) {
    createUser(input: $input) {
      user {
        username
        email
      }
    }
  }
`
describe("createUser", () => {
  const user = {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  it("creates user", async () => {
    const response = await gCall({
      source: createUserMutation,
      variableValues: {
        input: user,
      },
    })

    expect(response).toMatchObject({
      data: {
        createUser: {
          user: {
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
          },
        },
      },
    })

    const testUser = await User.findOne({
      where: { email: user.email.toLowerCase() },
    })
    expect(testUser).toBeDefined()
    expect(testUser!.confirmed).toBeFalsy()
    expect(testUser!.username).toBe(user.username.toLowerCase())
  })

  // VALIDATIONS
  it("should not allow duplicaate usernames", async () => {
    const user2 = {
      username: "test123ABC!@#",
      email: "test@test.com",
      password: "test123ABC!@#",
    }

    await gCall({
      source: createUserMutation,
      variableValues: {
        input: user2,
      },
    })

    const response2 = await gCall({
      source: createUserMutation,
      variableValues: {
        input: user2,
      },
    })

    expect(response2).toEqual({
      data: {
        createUser: {
          user: null,
        },
      },
    })
  })

  // TODO
  // should be in the range limit of chars
  // should not allow symbols
  // should lowercase everything before saving to db
  // should not allow ""
  // should rate limit requests to creat a user

  // const dbUser = await User.findOne({
  //   where: { email: user.email.toLowerCase() },
  // })

  // expect(dbUser).toBeDefined()
  // expect(dbUser!.username).toBe(user.username.toLowerCase())
})
