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

const rootTestCase = {
    id: 'root_Q(id: "5") { english } returns the fifth root',
    query: `
      query($id: ID!) {
        root_Q(id: $id) {
            english
        }
      }
    `,
    variables: { id: "5"},
    context: {},
    expected: { data: { root_Q: { english: "†  boots. (n.)" } } }
}

const stemTestCase = {
    id: 'stem_Q(id: "3") { doak } returns the third stem',
    query: `
      query($id: ID!) {
        stem_Q(id: $id) {
            doak
        }
      }
    `,
    variables: { id: "3"},
    context: {},
    expected: { data: { stem_Q: { doak: "ʔayx̣ʷ" } } }
}

let usersTestCase = {
  id: 'users_Q { username } returns all the usernames',
  query: `
    query {
      users_Q {
          username
      }
    }
  `,
  variables: {},
  context: { headers: { token: "" }},
  expected: { data: { users_Q: [
      { username: "original" },
      //{ username: "amyfou" },
      //{ username: "amytest" },
      //{ username: "avf" }
      ]
    } }
}

const getTokenQuery = `
  query($email: String!, $password: String!) {
    loginUser_Q(email: $email, password: $password) {
      password
    }
  }
`
let adminToken = ''
let viewToken = ''

async function getToken(email, password) {
  const result = await graphql(schema, getTokenQuery, null, {}, {email: email, password: password})
  const token = result.data.loginUser_Q[0].password
  console.log(token)
  return(token)
}

async function getTokenCall() {
  adminToken = await getToken("colrc@gmail.com", "colrc@gmail.com")
  //viewToken = await getToken("avf@avf.com", "avf")
  viewToken = ''
  console.log("adminToken= " + adminToken + ", viewToken= " + viewToken)
}

async function initializeTestCases() {
  // get admin token and a view token by logging in two preset users
  // and getting their tokens
  await getTokenCall()
  // Now that we have the tokens add them to the test cases we need
  usersTestCase.context.headers.token = adminToken
}

describe('Test Cases', () => {

    beforeAll( async () => {
      await initializeTestCases()
    })

    const cases = [affixTestCase, usersTestCase, rootTestCase, stemTestCase]
    //const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: { Query: { affix_Q: (_, args, context) => affix_R(args, affix_C), } })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj

        test(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })
})
