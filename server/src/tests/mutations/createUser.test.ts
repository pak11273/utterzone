import "reflect-metadata"

import { Connection } from "typeorm"
import { User } from "../../entities/User"
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
        id
      }
    }
  }
`

describe("createUse", () => {
  it("create user", async () => {
    const user = await User.create({
      username: "tester",
      email: "test@test.foo",
      password: "thisisapassword123!",
    })

    console.log("user: ", user)
    console.log(
      await gCall({
        source: createUserMutation,
        variableValues: {
          input: {
            username: "exampleUser1",
            email: "test@test.com",
            password: "xyz123Abc!@#",
          },
        },
        userId: user.id,
      })
    )
  })
})
