const { makeExecutableSchema } = require('graphql-tools');
const { // define mysql connectors
  Root,
  User,
  Affix,
  Stem,
  sequelize,
  affix_C,
  affixes_C,
  root_C,
  roots_C,
  stem_C,
  stems_C,
  authenticateUser_C,
  checkUserExists_C,
  loginUser_C,
  addUser_C,
  updateUser_C,
  updateUserAdmin_C,
  addAffix_C,
  addRoot_C,
  addStem_C,
  deleteAffix_C,
  deleteRoot_C,
  deleteStem_C,
  updateAffix_C
} = require('../connectors/mysqlDB');
const { // define resolvers
  authenticateUser_R,
  checkUserExists_R,
  loginUser_R,
  addUser_R,
  updateUser_R,
  updateUserAdmin_R,
  addAffix_R,
  addRoot_R,
  addStem_R,
  affix_R,
  affixes_R,
  deleteAffix_R,
  deleteRoot_R,
  deleteStem_R,
  root_R,
  roots_R,
  stem_R,
  stems_R,
  updateAffix_R
} = require('.././resolvers/mysqlDBResolver');

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
    roles: [String!]!
  }
  type UserExists {
    username: String!
    email: String!
    roles: [String!]!
  }
  type LoginUser {
    password: String!
  }
  type Token {
    token: String!
  }
  type Affix {
    id: ID!
    type: String!
    salish: String!
    nicodemus: String!
    english: String!
    link: String!
    page: String!
    active: String!
    prevId: Int
    user: User!
  }
  type Root {
    id: ID!
    root: String!
    number: Int!
    salish: String!
    nicodemus: String!
    english: String!
    active: String!
    prevId: Int
    user: User!
  }
  type Stem {
    id: ID!
    category: String!
    reichard: String!
    doak: String!
    salish: String!
    nicodemus: String!
    english: String!
    note: String!
    active: String!
    prevId: Int
    user: User!
  }
  type Query {
    authenticateUser_Q: [User]
    checkUserExists_Q(email:String!): [UserExists]
    loginUser_Q(email:String!,password:String!): [LoginUser]
    affixes_Q: [Affix]
    affix_Q(id:ID!): Affix
    roots_Q: [Root]
    root_Q(id:ID!): Root
    stems_Q: [Stem]
    stem_Q(id:ID!): Stem

  }
  type Mutation {
    addUser_M(first:String!, last:String!, username:String!,email:String!,password:String!): User
    updateUser_M(first:String!, last:String!, username:String!,email:String!,password:String!): User
    updateUserAdmin_M(id:String!,roles:[String!]!): User

    addAffix_M(type:String!, salish:String!, nicodemus:String!, english:String!, link:String!, page:String!): Affix
    updateAffix_M(id:ID!, type:String!, salish:String!, nicodemus:String!, english:String!, link:String!, page:String!): Affix
    deleteAffix_M(id:ID!): Affix

    addRoot_M(root:String!, number:Int!, salish:String!, nicodemus:String!, english:String!): Root
    updateRoot_M(root:String!, number:Int!, salish:String!, nicodemus:String!, english:String!): Root
    deleteRoot_M(id:ID!): Root

    addStem_M(category:String!, reichard:String!, doak:String!, salish:String!, nicodemus:String!, english:String!, note:String!): Stem
    updateStem_M(category:String!, reichard:String!, doak:String!, salish:String!, nicodemus:String!, english:String!, note:String!): Stem
    deleteStem_M(id:ID!): Stem
  }

`;

const resolvers = {
  Affix: {
    user: affix => { return User.findOne({ where: {id: affix.userId} }) },
  },

  Root: {
    user: root => { return User.findOne({ where: {id: root.userId} }) },
  },

  Stem: {
    user: stem => { return User.findOne({ where: {id: stem.userId} }) },
  },

  Query: {
    authenticateUser_Q: (_, args, context) => authenticateUser_R(context, authenticateUser_C),
    //check if user email already exists, for new user id creation
    checkUserExists_Q: (_, args, context) => checkUserExists_R(args, checkUserExists_C),
    loginUser_Q: (_, args, context) => loginUser_R(args, loginUser_C),
    affix_Q: (_, args, context) => affix_R(args, affix_C),
    affixes_Q: (_, args, context) => affixes_R(args, affixes_C),
    stem_Q: (_, args, context) => stem_R(args, stem_C),
    stems_Q: (_, args, context) => stems_R(args, stems_C),
    root_Q: (_, args, context) => root_R(args, root_C),
    roots_Q: (_, args, context) => roots_R(args, roots_C),
  },
  Mutation: {
    // first time user is created see - connector where a dummy role is inserted
    addUser_M: (_, args, context) => addUser_R(args,addUser_C),
    //check jwt token, validate if user is self then update own email & password but NOT the roles
    updateUser_M: (_, args, context) => updateUser_R(context,args,updateUser_C),
    //check jwt token, validate if user is admin then update any other user's roles
    updateUserAdmin_M: (_, args, context) => updateUserAdmin_R(context,args,["admin","owner"],updateUserAdmin_C),
    addAffix_M: (_, args, context) => addAffix_R(context, args, ["admin","owner"], addAffix_C),
    addRoot_M: (_, args, context) => addRoot_R(context, args, ["admin","owner"], addRoot_C),
    addStem_M: (_, args, context) => addStem_R(context, args, ["admin","owner"], addStem_C),
    deleteAffix_M: (_, args, context) => deleteAffix_R(context, args, ["admin","owner"], deleteAffix_C),
    deleteRoot_M: (_, args, context) => deleteRoot_R(context, args, ["admin","owner"], deleteRoot_C),
    deleteStem_M: (_, args, context) => deleteStem_R(context, args, ["admin","owner"], deleteStem_C),
    updateAffix_M:(_, args, context) => updateAffix_R(context, args, ["admin","owner"], updateAffix_C),
  }
};

module.exports = new makeExecutableSchema({ typeDefs, resolvers });

