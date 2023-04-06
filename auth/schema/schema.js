const { makeExecutableSchema } = require("graphql-tools");
require("dotenv").config({ path: __dirname + "./../.env" });

const {
  User,
  loginUser_C,
  addUser_C,
  getUserFromToken_C,
  isHuman_C,
} = require("../connectors/postgresDB");
const {
  // define resolvers
  loginUser_R,
  addUser_R,
  getUserFromToken_R,
  isHuman_R,
} = require("../resolvers/postgresDBResolver");

// *** set the variables needed for auditing *** //
// async function setSessionVariables() {
//   const [results, metadata] = await sequelize.query("SET application.name to 'colrc'");
//   const [results2, metadata2] = await sequelize.query("SET application.\"user\" to 'Nicodemus, Lawrence'");
// }

// setSessionVariables()

// passwrd field on type User shouldn't expose passwords
// instead is used to store json token after successfull login query - loginUser_Q
// it's ok to leave password at UserInput at Mutation

const typeDefs = `
  type User {
    id: ID!
    first: String!
    last: String!
    username: String!
    email: String!
    password: String!
    roles: [Role!]!
  }
  type Role {
    id: ID!
    role_code: String!
    role_value: String!
  }  
  type User_role {
    userId: ID!
    roleId: ID!
  }
  type LoginUser {
    password: String!
  }
  type Token {
    token: String!
  }
  type Human {
    token: Boolean!
  }
  type Query {
    loginUser_Q(email:String!,password:String!): [LoginUser]
    getUserFromToken_Q: User
    isHuman_Q(token:String!): Human
  }
  type Mutation {
    addUser_M(first:String!, last:String!, username:String!,email:String!,password:String!): User
  }
`;

const resolvers = {
  Query: {
    loginUser_Q: (_, args, context) => loginUser_R(args, loginUser_C),
    getUserFromToken_Q: (_, args, context) =>
      getUserFromToken_R(context, args, getUserFromToken_C),
    isHuman_Q: (_, args, context) => isHuman_R(args, isHuman_C),
  },
  Mutation: {
    // first time user is created see - connector where a view role is inserted
    addUser_M: (_, args, context) => addUser_R(args, addUser_C),
  },
};

module.exports = new makeExecutableSchema({ typeDefs, resolvers });
