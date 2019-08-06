//import { makeExecutableSchema } from 'graphql-tools'
const { graphql } = require('graphql')
//import resolvers from '../src/resolvers'
//import typeDefs from './schema/schema.js'

// The schema defines all of the types, queries, and mutations and
// connects to the database
const schema = require('../schema/schema')

// sequelize is the database connection, which needs to be closed after
// all tests are run.
// The other fundamental types are needed to populate the database as
// needed for each test.
const {
  sequelize,
  Root,
  User,
  Affix,
  Stem,
  Bibliography
} = require('../connectors/mysqlDB')

// const { // define mysql connectors
//   affix_C,
// } = require('../connectors/mysqlDB');
//
// const { // define resolvers
//   affix_R,
// } = require('.././resolvers/mysqlDBResolver');

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
  //console.log(token)
  return(token)
}

async function getTokenCall() {
  adminToken = await getToken("colrc@gmail.com", "colrc@gmail.com")
  //viewToken = await getToken("avf@avf.com", "avf")
  viewToken = ''
  //console.log("adminToken= " + adminToken + ", viewToken= " + viewToken)
}

async function initializeTestCases() {
  // get admin token and a view token by logging in two preset users
  // and getting their tokens
  await getTokenCall()
  // Now that we have the tokens add them to the test cases that need tokens
  usersTestCase.context.headers.token = adminToken
}

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

const textTestCase = {
    id: 'text_Q(id: "3") { speaker } returns the third stem',
    query: `
      query($id: ID!) {
        text_Q(id: $id) {
            speaker
        }
      }
    `,
    variables: { id: "3"},
    context: {},
    expected: { data: { text_Q: { speaker: "Tom Miyal" } } }
}

const textFileTestCase = {
    id: 'textfile_Q(id: "1") { msType } returns the first textfile',
    query: `
      query($id: ID!) {
        textfile_Q(id: $id) {
            msType
        }
      }
    `,
    variables: { id: "1"},
    context: {},
    expected: { data: { textfile_Q: { msType: "Handwritten" } } }
}

const textImageTestCase = {
    id: 'textimage_Q(id: "1") { src } returns the first textfile',
    query: `
      query($id: ID!) {
        textimage_Q(id: $id) {
            src
        }
      }
    `,
    variables: { id: "1"},
    context: {},
    expected: { data: { textimage_Q: { src: "http://localhost:3500/texts/CallingOnesKind/CallingOnesKind__Tom_Typed_Images/CallingOnesKind__Tom_Typed1.png" } } }
}

const userExistsTestCase = {
    id: 'checkUserExists_Q(email: "colrc@gmail.com") { username } returns the username of colrc@gmail.com',
    query: `
      query($email: String!) {
        checkUserExists_Q(email: $email) {
            username
        }
      }
    `,
    variables: { email: "colrc@gmail.com"},
    context: {},
    expected: { data: { checkUserExists_Q: [  { username: "original" } ] } }
}

// You will have to modify the expected username arrays to match your local users table
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
  context: { headers: { token: "" }},
  expected: { data: { users_Q: [
      { username: "original" },
      { username: "view" },
      { username: "dummy" }
      ]
    } }
}

describe('Test Cases', () => {

    beforeAll( async () => {
      await initializeTestCases()
    })

    afterAll( async () => {
      await sequelize.close()
    })

    const cases = [affixTestCase, usersTestCase, rootTestCase, stemTestCase, userExistsTestCase, textTestCase, textFileTestCase, textImageTestCase]
    //const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: { Query: { affix_Q: (_, args, context) => affix_R(args, affix_C), } })

    cases.forEach(obj => {
        const { id, query, variables, context, expected } = obj

        test(`query: ${id}`, async () => {
            const result = await graphql(schema, query, null, context, variables)
            return expect(result).toEqual(expected)
        })
    })
})
