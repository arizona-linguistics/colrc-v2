const { makeExecutableSchema } = require('graphql-tools');
require('dotenv').config({path:__dirname+'/./../../.env'});

const { // define mysql connectors
  Affix,
  Bibliography,
  Root,
  User,
  Stem,
  Spelling,
  Consonant,
  Vowel,
  Text,
  Texttofilerelation,
  Texttoaudiosetrelation,
  Textfile,
  Textimage,
  Filetoimagerelation,
  Audioset,
  Audiofile,
  Audiorelation,
  Elicitationfile,
  Elicitationset,
  Elicitationrelation,
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
  addSpelling_C,
  addStem_C,
  deleteAffix_C,
  deleteBibliography_C,
  deleteRoot_C,
  deleteSpelling_C,
  deleteStem_C,
  updateAffix_C,
  updateBibliography_C,
  updateRoot_C,
  updateStem_C,
  updateSpelling_C,
  spelling_C,
  spellings_C,
  consonants_C,
  vowels_C,
  texts_C,
  text_C,
  texttofilerelation_C,
  texttofilerelations_C,
  texttoaudiosetrelation_C,
  texttoaudiorelations_C,
  textfiles_C,
  textfile_C,
  filetoimagerelation_C,
  filetoimagerelations_C,
  textimages_C,
  textimage_C,
  audiofiles_C,
  audiofile_C,
  audiosets_C,
  audioset_C,
  audiorelation_C,
  audiorelations_C,
  elicitationfiles_C,
  elicitationfile_C,
  elicitationset_C,
  elicitationsets_C,
  elicitationrelation_C,
  elicitationrelations_C,
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
  addSpelling_R,
  addStem_R,
  affix_R,
  affixes_R,
  bibliography_R,
  bibliographies_R,
  deleteAffix_R,
  deleteRoot_R,
  deleteSpelling_R,
  deleteStem_R,
  root_R,
  roots_R,
  stem_R,
  stems_R,
  updateAffix_R,
  updateRoot_R,
  updateStem_R,
  updateSpelling_R,
  spelling_R,
  spellings_R,
  consonants_R,
  vowels_R,
  text_R,
  texts_R,
  texttofilerelation_R,
  texttofilerelations_R,
  texttoaudiosetrelation_R,
  texttoaudiosetrelations_R,
  textfile_R,
  textfiles_R,
  filetoimagerelation_R,
  filetoimagerelations_R,
  textimage_R,
  textimages_R,
  audiofile_R,
  audiofiles_R,
  audioset_R,
  audiosets_R,
  audiorelation_R,
  audiorelations_R,
  elicitationfile_R,
  elicitationfiles_R,
  elicitationset_R,
  elicitationsets_R,
  elicitationrelation_R,
  elicitationrelations_R
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
    active: String!
    prevId: Int
    user: User!  
  }
  type Consonant {
    id: ID!
    orthography: String
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
  type Text {
    id: ID!
    title: String!
    speaker: String
    cycle: String
    textfiles: [Textfile]
    audiosets: [Audioset]
    active: String!
    prevId: Int
    user: User!   
  }
  type Texttofilerelation {
    id: ID!
    textId: String!
    textfileId: String!
  }
type Texttoaudiosetrelation {
    id: ID!
    textId: String!
    audiosetId: String!
  }
  type Textfile {
    id: ID!
    subdir: String!
    src: String
    resType: String
    msType: String    
    fileType: String
    textimages: [Textimage]    
    active: String!
    prevId: Int
    user: User!   
  }
   type Textimage {
    id: ID!
    subdir: String
    src: String
    active: String!
    prevId: Int
    user: User!   
  }
  type Filetoimagerelation {
    id: ID!
    textfileId: String!
    textimageId: String!
  }
  type Audiofile {
    id: ID!
    subdir: String!
    src: String!
    type: String!
    direct: String!
    active: String!
    user: User!  
  } 
  type Audioset {
    id: ID!
    title: String!
    speaker: String
    text: Text
    audiofiles: [Audiofile]
    active: String!
    user: User!  
  }
  type Audiorelation {
    id: ID!
    audiofileId: String!
    audiosetId: String!
  }
  type Elicitationfile {
    id: ID!
    src: String!
    type: String!
    direct: String!
    active: String!
    user: User!  
  }  
  type Elicitationset {
    id: ID!
    title: String!
    elicitationfiles: [Elicitationfile]
    active: String!
    prevId: Int
    user: User!
  } 
  type Elicitationrelation {
    id: ID!
    elicitationfileId: String!
    elicitationsetId: String!
  }
  type Query {
    authenticateUser_Q: [User]
    checkUserExists_Q(email:String!): [UserExists]
    getUserFromToken_Q: User
    loginUser_Q(email:String!,password:String!): [LoginUser]
    users_Q: [User]
    affixes_Q(active: String, search: String): [Affix]
    affix_Q(id:ID!): Affix
    roots_Q(active: String, search: String): [Root]
    root_Q(id:ID!): Root
    stems_Q(active: String, search: String): [Stem]
    stem_Q(id:ID!): Stem
    bibliographies_Q(active: String, search: String): [Bibliography]
    bibliography_Q(id:ID!): Bibliography
    spelling_Q(id:ID!): Spelling
    spellings_Q(active: String, search: String): [Spelling]
    consonants_Q: [Consonant]
    vowels_Q: [Vowel]
    texts_Q: [Text]
    text_Q(id:ID!): Text
    texttofilerelations_Q: [Texttofilerelation]
    texttofilerelation_Q(id:ID!): Texttofilerelation
    texttoaudiosetrelations_Q: [Texttoaudiosetrelation]
    texttoaudiosetrelation_Q(id:ID!): Texttoaudiosetrelation
    textfiles_Q: [Textfile]
    textfile_Q(id:ID!): Textfile
    filetoimagerelation_Q(id:ID!): Filetoimagerelation
    filetoimagerelations_Q: [Filetoimagerelation]
    textimages_Q: [Textimage]
    textimage_Q(id:ID!): Textimage
    audiosets_Q: [Audioset]
    audioset_Q(id:ID!): Audioset
    audiofiles_Q: [Audiofile]
    audiofile_Q(id:ID!): Audiofile
    audiorelations_Q: [Audiorelation]
    audiorelation_Q(id:ID!): Audiorelation   
    elicitationfile_Q(id:ID!): Elicitationfile
    elicitationfiles_Q: [Elicitationfile]
    elicitationset_Q(id:ID!): Elicitationset
    elicitationsets_Q: [Elicitationset]
    elicitationrelation_Q(id:ID!): Elicitationrelation
    elicitationrelations_Q: [Elicitationrelation]
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

    addSpelling_M(reichard:String, nicodemus:String!, salish:String, english:String, note:String ): Spelling
    updateSpelling_M(id:ID!, reichard:String, nicodemus: String!, salish:String, english:String, note:String): Spelling
    deleteSpelling_M(id:ID!): Spelling

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
  Spelling: {
    user: spelling => { return User.findOne({ where: {id: spelling.userId} }) },
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
  Text: {
    user: text => { return User.findOne({ where: {id: text.userId} }) },
    textfiles: async text => {
      let tfiles = await text.getTextfiles()
      let i = 0
      while (i < tfiles.length) {
        tfiles[i].src = process.env.STATICMEDIAPATH + tfiles[i].subdir + "/" + tfiles[i].src
        i++
      }
      return tfiles
    },
    audiosets: text => { return text.getAudiosets() },
  },

  Textfile: {
    user: textfile => { return User.findOne({ where: {id: textfile.userId} }) },
    textimages: async textfile => {
      let ifiles = await textfile.getTextimages()
      let i = 0
      while (i < ifiles.length) {
        ifiles[i].src = process.env.STATICMEDIAPATH + ifiles[i].subdir + "/" + ifiles[i].src
        i++
      }
      return ifiles
    },
  },

  Textimage: {
    user: textimage => { return User.findOne({ where: {id: textimage.userId} }) },
  },
  Audioset: {
    user: audioset => { return User.findOne({ where: {id: audioset.userId} }) },
    audiofiles: async audioset => { 
      let afiles = await audioset.getAudiofiles() 
      let i = 0
      while (i < afiles.length) {
        afiles[i].src = process.env.STATICMEDIAPATH + afiles[i].subdir + "/" + afiles[i].src
        i++
      }
      return afiles      
    },
  }, 
  Audiofile: {
    user: audiofile => { return User.findOne({ where: {id: audiofile.userId} }) },
  }, 
  Elicitationset: {
    user: elicitationset => { return User.findOne({ where: {id: elicitationset.userId} }) },
    elicitationfiles: async elicitationset => { 
      let elfiles = await elicitationset.getElicitationfiles() 
      let i = 0
      while (i < elfiles.length) {
        elfiles[i].src = process.env.STATICELICITATIONSPATH + elfiles[i].src
        i++
      }
      return elfiles      
    },
  }, 
  Elicitationfile: {
    user: elicitationfile => { return User.findOne({ where: {id: elicitationfile.userId} }) },
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
    spelling_Q: (_, args, context) => spelling_R(args, spelling_C),
    spellings_Q: (_, args, context) => spellings_R(args, spellings_C),
    consonants_Q: (_, args, context) => consonants_R(args, consonants_C),
    vowels_Q: (_, args, context) => vowels_R(args, vowels_C),
    text_Q: (_, args, context) => text_R(args, text_C),
    texts_Q: (_, args, context) => texts_R(args, texts_C),
    texttofilerelation_Q: (_, args, context) => texttofilerelation_R(args, texttofilerelation_C),
    texttofilerelations_Q: (_, args, context) => texttofilerelations_R(args, texttofilerelations_C),
    texttoaudiosetrelation_Q: (_, args, context) => texttoaudiosetrelation_R(args, texttoaudiosetrelation_C),
    texttoaudiosetrelations_Q: (_, args, context) => texttoaudiosetrelations_R(args, texttoaudiosetrelations_C),
    textfile_Q: (_, args, context) => textfile_R(args, textfile_C),
    textfiles_Q: (_, args, context) => textfiles_R(args, textfiles_C),
    filetoimagerelation_Q: (_, args, context) => filetoimagerelation_R(args, filetoimagerelation_C),
    filetoimagerelations_Q: (_, args, context) => filetoimagerelations_R(args, filetoimagerelations_C),
    textimage_Q: (_, args, context) => textimage_R(args, textimage_C),
    textimages_Q: (_, args, context) => textimages_R(args, textimages_C),
    audioset_Q: (_, args, context) => audioset_R(args, audioset_C),
    audiosets_Q: (_, args, context) => audiosets_R(args, audiosets_C),            
    audiofile_Q: (_, args, context) => audiofile_R(args, audiofile_C),     
    audiofiles_Q: (_, args, context) => audiofiles_R(args, audiofiles_C),
    audiorelation_Q: (_, args, context) => audiorelation_R(args, audiorelation_C),
    audiorelations_Q: (_, args, context) => audiorelations_R(args, audiorelations_C),
    elicitationfile_Q: (_, args, context) => elicitationfile_R(args, elicitationfile_C),
    elicitationfiles_Q: (_, args, context) => elicitationfiles_R(args, elicitationfiles_C),
    elicitationset_Q: (_, args, context) => elicitationset_R(args, elicitationset_C),
    elicitationsets_Q: (_, args, context) => elicitationsets_R(args, elicitationsets_C),
    elicitationrelation_Q: (_, args, context) => elicitationrelation_R(args, elicitationrelation_C),
    elicitationrelations_Q: (_, args, context) => elicitationrelations_R(args, elicitationrelations_C)      
  },
  Mutation: {
    // first time user is created see - connector where a view role is inserted
    addUser_M: (_, args, context) => addUser_R(args,addUser_C),
    //check jwt token, validate if user is self then update own email & password but NOT the roles
    updateUser_M: (_, args, context) => updateUser_R(context,args,updateUser_C),
    //check jwt token, validate if user is admin then update any other user's roles
    updateUserAdmin_M: (_, args, context) => updateUserAdmin_R(context,args,["admin","owner"],updateUserAdmin_C),
    addAffix_M: (_, args, context) => addAffix_R(context, args, ["admin","owner","update"], addAffix_C),
    addBibliography_M: (_, args, context) => addBibliography_R(context, args, ["admin","owner","update"], addBibliography_C),
    addRoot_M: (_, args, context) => addRoot_R(context, args, ["admin","owner","update"], addRoot_C),
    addSpelling_M: (_, args, context) => addSpelling_R(context, args, ["admin","owner","update"], addSpelling_C),
    addStem_M: (_, args, context) => addStem_R(context, args, ["admin","owner","update"], addStem_C),
    deleteAffix_M: (_, args, context) => deleteAffix_R(context, args, ["admin","owner","update"], deleteAffix_C),
    deleteBibliography_M: (_, args, context) => deleteBibliography_R(context, args, ["admin","owner","update"], deleteBibliography_C),
    deleteRoot_M: (_, args, context) => deleteRoot_R(context, args, ["admin","owner","update"], deleteRoot_C),
    deleteSpelling_M: (_, args, context) => deleteSpelling_R(context, args, ["admin","owner","update"], deleteSpelling_C),
    deleteStem_M: (_, args, context) => deleteStem_R(context, args, ["admin","owner","update"], deleteStem_C),
    updateAffix_M:(_, args, context) => updateAffix_R(context, args, ["admin","owner","update"], updateAffix_C),
    updateBibliography_M:(_, args, context) => updateBibliography_R(context, args, ["admin","owner","update"], updateBibliography_C),
    updateRoot_M:(_, args, context) => updateRoot_R(context, args, ["admin","owner","update"], updateRoot_C),
    updateSpelling_M:(_, args, context) => updateSpelling_R(context, args, ["admin","owner","update"], updateSpelling_C),
    updateStem_M:(_, args, context) => updateStem_R(context, args, ["admin","owner","update"], updateStem_C),
  }
};

module.exports = new makeExecutableSchema({ typeDefs, resolvers });

