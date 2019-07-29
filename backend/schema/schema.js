const { makeExecutableSchema } = require('graphql-tools');
const { // define mysql connectors
  Affix,
  Bibliography,
  Root,
  User,
  Stem,
  sequelize,
  affix_C,
  affixes_C,
  bibliography_C,
  bibliographies_C,
  root_C,
  roots_C,
  stem_C,
  stems_C,
  users_C,
  authenticateUser_C,
  checkUserExists_C,
  getUserFromToken_C,
  loginUser_C,
  addUser_C,
  updateUser_C,
  updateUserAdmin_C,
  addAffix_C,
  addBibliography_C,
  addRoot_C,
  addStem_C,
  deleteAffix_C,
  deleteBibliography_C,
  deleteRoot_C,
  deleteStem_C,
  updateAffix_C,
  updateBibliography_C,
  updateRoot_C,
  updateStem_C,
  spellings_C,
  consonants_C,
  vowels_C
} = require('../connectors/mysqlDB');
const { // define resolvers
  authenticateUser_R,
  checkUserExists_R,
  loginUser_R,
  addUser_R,
  getUserFromToken_R,
  updateUser_R,
  updateUserAdmin_R,
  users_R,
  addAffix_R,
  addBibliography_R,
  addRoot_R,
  addStem_R,
  affix_R,
  affixes_R,
  bibliography_R,
  bibliographies_R,
  deleteAffix_R,
  deleteRoot_R,
  deleteStem_R,
  root_R,
  roots_R,
  stem_R,
  stems_R,
  updateAffix_R,
  updateRoot_R,
  updateStem_R,
  spellings_R,
  consonants_R,
  vowels_R
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
    type: String
    salish: String
    nicodemus: String!
    english: String!
    link: String
    page: String
    editnote: String
    active: String!
    prevId: Int
    user: User!
  }
  type Bibliography {
    id: ID!
    author: String
    year: String
    title: String!
    reference: String
    link: String
    linktext: String
    active: String!
    prevId: Int
    user: User!
  }
  type Root {
    id: ID!
    root: String!
    number: Int
    salish: String
    nicodemus: String!
    english: String!
    editnote: String
    active: String!
    prevId: Int
    user: User!
  }
  type Stem {
    id: ID!
    category: String
    reichard: String
    doak: String
    salish: String
    nicodemus: String!
    english: String!
    note: String
    editnote: String
    active: String!
    prevId: Int
    user: User!
  }
  type Spelling {
    id: ID!
    reichard: String
    nicodemus: String
    salish: String
    english: String
    note: String    
  }
  type Consonant {
    id: ID!
    orthography: String
    type: String
    voice: String
    manner: String
    secondary: String
    labial: String
    alveolar: String
    alveopalatal: String
    lateral: String
    palatal: String
    velar: String
    uvular: String
    glottal: String
    pharyngeal: String
  }
  type Vowel {
    id: ID!
    orthography: String
    height: String
    front: String
    central: String
    back: String 
  }
  type Query {
    authenticateUser_Q: [User]
    checkUserExists_Q(email:String!): [UserExists]
    getUserFromToken_Q: User
    loginUser_Q(email:String!,password:String!): [LoginUser]
    users_Q: [User]
    affixes_Q: [Affix]
    affix_Q(id:ID!): Affix
    roots_Q: [Root]
    root_Q(id:ID!): Root
    stems_Q: [Stem]
    stem_Q(id:ID!): Stem
    bibliographies_Q: [Bibliography]
    bibliography_Q(id:ID!): Bibliography
    spellings_Q: [Spelling]
    consonants_Q: [Consonant]
    vowels_Q: [Vowel]
  }
  type Mutation {
    addUser_M(first:String!, last:String!, username:String!,email:String!,password:String!): User
    updateUser_M(first:String!, last:String!, username:String!,email:String!,password:String!): User
    updateUserAdmin_M(id:ID!,roles:[String!]!): User

    addAffix_M(type:String, salish:String, nicodemus:String!, english:String!, link:String, page:String, editnote:String): Affix
    updateAffix_M(id:ID!, type:String, salish:String, nicodemus:String!, english:String!, link:String, page:String, editnote:String): Affix
    deleteAffix_M(id:ID!): Affix

    addRoot_M(root:String!, number:Int, salish:String, nicodemus:String!, english:String!, editnote:String): Root
    updateRoot_M(id:ID!, root:String!, number:Int, salish:String, nicodemus:String!, english:String!, editnote:String): Root
    deleteRoot_M(id:ID!): Root

    addStem_M(category:String, reichard:String, doak:String, salish:String, nicodemus:String!, english:String!, note:String, editnote:String): Stem
    updateStem_M(id:ID!, category:String, reichard:String, doak:String, salish:String, nicodemus:String!, english:String!, note:String, editnote:String): Stem
    deleteStem_M(id:ID!): Stem

    addBibliography_M(author:String, year:String, title:String!, reference:String, link:String, linktext:String): Bibliography
    updateBibliography_M(id:ID!, author:String, year:String, title:String!, reference:String, link:String, linktext:String): Bibliography
    deleteBibliography_M(id:ID!): Bibliography
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
  
  User: {
    roles: user => { return user.roles.split(',') },  
  },

  Bibliography: {
    user: bibliography => { return User.findOne({ where: {id: bibliography.userId} }) },
  },

  Query: {
    authenticateUser_Q: (_, args, context) => authenticateUser_R(context, authenticateUser_C),
    //check if user email already exists, for new user id creation
    getUserFromToken_Q: (_, args, context) => getUserFromToken_R(context, args, getUserFromToken_C),
    checkUserExists_Q: (_, args, context) => checkUserExists_R(args, checkUserExists_C),
    loginUser_Q: (_, args, context) => loginUser_R(args, loginUser_C),
    users_Q: (_, args, context) => users_R(context, args, ["admin","owner"], users_C),
    affix_Q: (_, args, context) => affix_R(args, affix_C),
    affixes_Q: (_, args, context) => affixes_R(args, affixes_C),
    stem_Q: (_, args, context) => stem_R(args, stem_C),
    stems_Q: (_, args, context) => stems_R(args, stems_C),
    root_Q: (_, args, context) => root_R(args, root_C),
    roots_Q: (_, args, context) => roots_R(args, roots_C),
    bibliography_Q: (_, args, context) => bibliography_R(args, bibliography_C),
    bibliographies_Q: (_, args, context) => bibliographies_R(args, bibliographies_C),
    spellings_Q: (_, args, context) => spellings_R(args, spellings_C),
    consonants_Q: (_, args, context) => consonants_R(args, consonants_C),
    vowels_Q: (_, args, context) => vowels_R(args, vowels_C)
  },
  Mutation: {
    // first time user is created see - connector where a view role is inserted
    addUser_M: (_, args, context) => addUser_R(args,addUser_C),
    //check jwt token, validate if user is self then update own email & password but NOT the roles
    updateUser_M: (_, args, context) => updateUser_R(context,args,updateUser_C),
    //check jwt token, validate if user is admin then update any other user's roles
    updateUserAdmin_M: (_, args, context) => updateUserAdmin_R(context,args,["admin","owner"],updateUserAdmin_C),
    addAffix_M: (_, args, context) => addAffix_R(context, args, ["admin","owner"], addAffix_C),
    addBibliography_M: (_, args, context) => addBibliography_R(context, args, ["admin","owner"], addBibliography_C),
    addRoot_M: (_, args, context) => addRoot_R(context, args, ["admin","owner"], addRoot_C),
    addStem_M: (_, args, context) => addStem_R(context, args, ["admin","owner"], addStem_C),
    deleteAffix_M: (_, args, context) => deleteAffix_R(context, args, ["admin","owner"], deleteAffix_C),
    deleteBibliography_M: (_, args, context) => deleteBibliography_R(context, args, ["admin","owner"], deleteBibliography_C),
    deleteRoot_M: (_, args, context) => deleteRoot_R(context, args, ["admin","owner"], deleteRoot_C),
    deleteStem_M: (_, args, context) => deleteStem_R(context, args, ["admin","owner"], deleteStem_C),
    updateAffix_M:(_, args, context) => updateAffix_R(context, args, ["admin","owner"], updateAffix_C),
    updateBibliography_M:(_, args, context) => updateBibliography_R(context, args, ["admin","owner"], updateBibliography_C),
    updateRoot_M:(_, args, context) => updateRoot_R(context, args, ["admin","owner"], updateRoot_C),
    updateStem_M:(_, args, context) => updateStem_R(context, args, ["admin","owner"], updateStem_C),
  }
};

module.exports = new makeExecutableSchema({ typeDefs, resolvers });

