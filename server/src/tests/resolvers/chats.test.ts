// import { createTestClient } from 'apollo-server-testing';
// import { ApolloServer, gql } from 'apollo-server-express';
// import schema from '../../schema';

// describe('Query.chat', () => {
//   it('should fetch specified chat', async () => {
//     const server = new ApolloServer({ schema });

//     const { query } = createTestClient(server);

//     const res = await query({
//       variables: { chatId: '1' },
//       query: gql`
//         query GetChat($chatId: ID!) {
//           chat(chatId: $chatId) {
//             id
//             name
//             picture
//             lastMessage {
//               id
//               content
//               createdAt
//             }
//           }
//         }
//       `,
//     });

//     expect(res.data).toBeDefined();
//     expect(res.errors).toBeUndefined();
//     expect(res.data).toMatchSnapshot();
//   });
// });

import { Connection } from "typeorm"
import { testConn } from "../utils/testConn"

let conn: Connection

beforeAll(async () => {
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
})

describe("createUse", () => {
  it("create user", () => {
    // do something here
    // graphql({})
  })
})
