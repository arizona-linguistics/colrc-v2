//import { makeExecutableSchema } from 'graphql-tools'
const { graphql } = require('graphql')
//import resolvers from '../src/resolvers'
//import typeDefs from './schema/schema.js'

const schema = require('../schema/schema')

// const { // define mysql connectors
//   affix_C,
// } = require('../connectors/mysqlDB');
//
// const { // define resolvers
//   affix_R,
// } = require('.././resolvers/mysqlDBResolver');

const affixTestCase = {
    id: 'affix_Q(id: "1") { english } returns the first affix',
    query: `
      query($id: ID!) {
        affix_Q(id: $id) {
            english
        }
      }
    `,
    variables: { id: "1"},
    context: {},
    expected: { data: { affix_Q: { english: "'first, before' " } } }
}

const usersTestCase = {
  id: 'users_Q { username } returns all the usernames',
  query: `
    query {
      users_Q {
          username
      }
    }
  `,
  variables: {},
  context: { headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjb2xyY0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im9yaWdpbmFsIiwiaWF0IjoxNTYzOTAxNDgwLCJleHAiOjE1NjQxNjA2ODB9.kYTC0eaEq-GOaU0h4fFTx4oHUo2IibjC0ZCI5x0rX3w" }},
  expected: { data: { users_Q: [{ username: "original" }] } }
}

describe('Test Cases', () => {

    const cases = [affixTestCase, usersTestCase]
    //const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: { Query: { affix_Q: (_, args, context) => affix_R(args, affix_C), } })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj

        test(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })
})
