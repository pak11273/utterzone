import "reflect-metadata"

import { Connection } from "typeorm"
import { User } from "../../entities/User"
import { gCall } from "../utils/gCall"
import { getConnection } from "typeorm"
import { testConn } from "../utils/testConn"

// import { Zone } from "../../entities/Zone"

let conn: Connection

beforeAll(async () => {
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
})

const createZoneMutation = `
    mutation  createZone($input: ZoneInput!) {
        createZone(input:$input) {
            id
            hostId
            app
            description
            name
            mature
            token
        }
    }
`

describe("create a zone", () => {
  const zone = {
    name: "zoneTEST123!",
    password: "zoneTEST123!#",
    app: "hello",
    learningLanguage: "english",
    nativeLanguage: "french",
    maxParticipants: 30,
    description: "a thing about the thing",
    public: true,
    mature: false,
    premium: false,
    hostId: "",
  }

  beforeEach(async () => {
    // clear users from database
    await getConnection().query('delete from "user";')
    // clear zones
    await getConnection().query("delete from zone;")
  })

  it("should exist in the database", async () => {
    // create a defined user
    const dbUser = await User.create({
      username: "zoner1234ABC!",
      email: "zoner123@zoner.com",
      password: "1234ABC!#$@#.abc",
    }).save()

    // check if there area any zone created by user
    const users = await User.find({ relations: ["zone"] })

    zone.hostId = users[0].id

    // if the zone doesn't exist then create it
    if (!users[0].zone) {
      let response = await gCall({
        source: createZoneMutation,
        variableValues: {
          input: zone,
        },
        userId: dbUser.id,
      })

      expect(response).toBeDefined()
    }
  })

  it("should overwrite an existing zone", async () => {
    // create a defined user
    await User.create({
      username: "zoner1234ABC!",
      email: "zoner123@zoner.com",
      password: "1234ABC!#$@#.abc",
    }).save()

    const foundUser = await User.find({ username: "zoner1234ABC!" })

    // console.log("user: ", foundUser)

    const response1 = await gCall({
      source: createZoneMutation,
      variableValues: {
        input: zone,
      },
      userId: foundUser[0].id,
    })

    if (response1) null

    // console.log("resp1: ", response1)
  })
})

//   // if the user already has a zone then overrite it with a new one
//   const response2 = await gCall({
//     source: createZoneMutation,
//     variableValues: {
//       input: zone,
//     },
//     userId: foundUser[0].id,
//   })

//   console.log("resp2: ", response2)

//   if (response1) {
//     //null
//   }

//   // console.log("response2: ", response2)

//   expect(response2.data).toBeNull()
// })

// it("should not allow users to create more than 1 zone", async () => {
// const dbUser = await User.create({
//   username: "test12345ABC",
//   email: "createzone@createzone.com",
//   password: "123456789ABC!@#$.",
// }).save()
// console.log(dbUser)
// await gCall({
//   source: createZoneMutation,
//   variableValues: {
//     input: zone,
//   },
//   userId: dbUser.id,
// })
// const response = await gCall({
//   source: createZoneMutation,
//   variableValues: {
//     input: zone,
//   },
//   userId: dbUser.id,
// })
// })
