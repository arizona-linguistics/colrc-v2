const graphql = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
//const _ = require('lodash');
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
  addStem_C
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
  root_R,
  roots_R,
  stem_R,
  stems_R
} = require('.././resolvers/mysqlDBResolver');

const staticServerAddress = "http://lasrv01.ipfw.edu/";

const dirPrefixes = {
  typedImage: "COLRC/texts/",
  typedPdf: "COLRC/texts/",
  metaDataTyped: "COLRC/texts/metadata/",
  handImage: "COLRC/texts/",
  handPdf: "COLRC/texts/",
  metaDataHand: "COLRC/texts/metadata/",
  pubEnglImage: "COLRC/texts/",
  pubEnglPdf: "COLRC/texts/",
  audio: "audio/"
};

const RootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    id: { type: GraphQLID },
    root: { type: GraphQLString },
    number: { type: GraphQLInt },
    salish: { type: GraphQLString },
    nicodemus: { type: GraphQLString },
    english: { type: GraphQLString },
    active: { type: GraphQLString },
    prevId: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findOne({ where: { id: parent.userId } });
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    first: { type: GraphQLString },
    last: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    roles: { type: GraphQLString }
    // roots: {
    //   type: new GraphQLList(RootType),
    //   resolve(parent, args) {
    //     return _.filter(roots, { userId: parent.id });
    //   }
    // }
  })
});

const AffixType = new GraphQLObjectType({
  name: 'Affix',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    salish: { type: GraphQLString },
    nicodemus: { type: GraphQLString },
    english: { type: GraphQLString },
    link: { type: GraphQLString },
    page: { type: GraphQLString },
    active: { type: GraphQLString },
    prevId: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findOne({ where: { id: parent.userId } });
      }
    }
  })
});

const StemType = new GraphQLObjectType({
  name: 'Stem',
  fields: () => ({
    id: { type: GraphQLID },
    category: { type: GraphQLString },
    reichard: { type: GraphQLString },
    doak: { type: GraphQLString },
    salish: { type: GraphQLString },
    nicodemus: { type: GraphQLString },
    english: { type: GraphQLString },
    note: { type: GraphQLString },
    active: { type: GraphQLString },
    prevId: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findOne({ where: { id: parent.userId } });
      }
    }
  })
});

const BaseQuery = new GraphQLObjectType({
  name: 'BaseQueryType',
  fields: {
    root: {
      type: RootType,
      args: { id: {type: GraphQLID } },
      resolve(parent, args) {
      	return Root.findOne({ where: { id: args.id } });
      }
    },
    user: {
      type: UserType,
      args: { id: {type: GraphQLID } },
      resolve(parent, args) {
        return User.findOne({ where: { id: args.id } });
      }
    },
    affix: {
      type: AffixType,
      args: { id: {type: GraphQLID } },
      resolve(parent, args) {
        return Affix.findOne({ where: { id: args.id } });
      }
    },
    stem: {
      type: StemType,
      args: { id: {type: GraphQLID } },
      resolve(parent, args) {
        return Stem.findOne({ where: { id: args.id } });
      }
    },
    roots: {
      type: new GraphQLList(RootType),
      resolve(parent, args) {
        //return Root.findAll({ limit: 100 });
        return Root.findAll({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.findAll({});
      }
    },
    affixes: {
      type: new GraphQLList(AffixType),
      resolve(parent, args) {
        return Affix.findAll({});
      }
    },
    stems: {
      type: new GraphQLList(StemType),
      resolve(parent, args) {
        return Stem.findAll({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addStem: {
			type:  StemType,
			args: {
				category: { type: new GraphQLNonNull(GraphQLString) },
				reichard: { type: new GraphQLNonNull(GraphQLString) },
				doak: { type: new GraphQLNonNull(GraphQLString) },
				salish: { type: new GraphQLNonNull(GraphQLString)},
				nicodemus: { type: new GraphQLNonNull(GraphQLString)},
				english: { type: new GraphQLNonNull(GraphQLString)},
        note: { type: new GraphQLNonNull(GraphQLString)},
        userId: { type: new GraphQLNonNull(GraphQLInt) },
      },
			resolve(parent,args){
				let stem = new Stem({
					category: args.category,
					reichard: args.reichard,
					doak: args.doak,
					salish: args.salish,
					nicodemus: args.nicodemus,
					english: args.english,
          			note: args.note,
          			active: 'Y',
         			userId: args.userId
				});
				return stem.save();
			}
    },
    // deleteRoot: {
    //   type: RootType,
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLID) }
    //   },
    //   resolve(parent,args) {
    //     return Root.update(
    //       {
    //         active: 'N'
    //       },
    //       {returning: true, where: {id: args.id} }
    //     );
    //   }
    // },
    deleteStem: {
      type: StemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent,args) {
        return
          Stem.findOne({ where: { id: args.id} })
        	.then( stem => {
        		stem.active = 'N';
  	        return stem.save();
      		})
      		.catch(err => {
      			return err;
      		});
      }
    },
    updateStem: {
      type: StemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        reichard: { type: new GraphQLNonNull(GraphQLString)},
        doak: { type: new GraphQLNonNull(GraphQLString)},
        salish: { type: new GraphQLNonNull(GraphQLString)},
		nicodemus: { type: new GraphQLNonNull(GraphQLString)},
		english: { type: new GraphQLNonNull(GraphQLString)},
        note: { type: new GraphQLNonNull(GraphQLString)},
        userId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent,args) {
        Stem.update(
          {
            active: 'N'
          },
          {returning: true, where: {id: args.id}
          }
        );
        let stem = new Stem({
            category: args.category,
            reichard: args.reichard,
            doak: args.doke,
            salish: args.salish,
            nicodemus: args.nicodemus,
            english: args.english,
            note: args.note,
            active: 'Y',
            prevId: args.id,
            userId: args.userId
          });
          return stem.save();
      }
    },
		addAffix: {
			type:  AffixType,
			args: {
				type: { type: new GraphQLNonNull(GraphQLString) },
				salish: { type: new GraphQLNonNull(GraphQLString)},
				nicodemus: { type: new GraphQLNonNull(GraphQLString)},
				english: { type: new GraphQLNonNull(GraphQLString)},
				link: { type: new GraphQLNonNull(GraphQLString)},
				page: { type: new GraphQLNonNull(GraphQLString)},
				userId: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent,args){
				let affix = new Affix({
					type: args.type,
					salish: args.salish,
					nicodemus: args.nicodemus,
					english: args.english,
					link: args.link,
					page: args.page,
					active: 'Y',
					userId: args.userId
				});
				return affix.save();
			}
		},

    deleteAffix: {
      type: AffixType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent,args) {
      	return Affix.findOne({ where: { id: args.id} })
      	.then( affix => {
      		affix.active = 'N';
	        return affix.save();
		})
		.catch(err => {
			return err;
		});
      }
    },

    updateAffix: {
      type: AffixType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        salish: { type: new GraphQLNonNull(GraphQLString)},
        nicodemus: { type: new GraphQLNonNull(GraphQLString)},
        english: { type: new GraphQLNonNull(GraphQLString)},
        link: { type: new GraphQLNonNull(GraphQLString)},
        page: { type: new GraphQLNonNull(GraphQLString)},
        userId: { type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parent,args) {
        sequelize.transaction(t => {

          return Affix.findOne(
            {
              where: { id: args.id},
              lock: t.LOCK.UPDATE,
              transaction: t
            }
          )
          .then( affix => {
            // Found an affix, now 'delete' it
            affix.active = 'N';
            return affix.save({transaction: t});
          })
          .then( affix => {
            // 'deleted' the old affix, now add the new affix
            let newAffix = new Affix({
              	type: args.type,
                salish: args.salish,
                nicodemus: args.nicodemus,
                english: args.english,
                link: args.link,
                page: args.page,
       	        active: 'Y',
    			      prevId: args.id,
    			      userId: args.userId
    		    });
    			  return newAffix.save({transaction: t});
          })
          .catch(err => {
            return err;
          });
        });
      }
    },

		addRoot: {
			type:  RootType,
			args: {
				root: { type: new GraphQLNonNull(GraphQLString) },
				number: { type: new GraphQLNonNull(GraphQLInt) },
				salish: { type: new GraphQLNonNull(GraphQLString)},
				nicodemus: { type: new GraphQLNonNull(GraphQLString)},
				english: { type: new GraphQLNonNull(GraphQLString)},
        		userId: { type: new GraphQLNonNull(GraphQLInt) }
				},
			resolve(parent,args){
				let root = new Root({
					root: args.root,
					number: args.number,
					salish: args.salish,
					nicodemus: args.nicodemus,
					english: args.english,
			        active: 'Y',
			        userId: args.userId
				});
				return root.save();
			}
		},
    deleteRoot: {
      type: RootType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
    	resolve(parent,args) {
      	return Root.findOne({ where: { id: args.id} })
      	.then( root => {
      		root.active = 'N';
	        return root.save();
    		})
    		.catch(err => {
    			return err;
    		});
      }
    },

    updateRoot: {
      type: RootType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        root: { type: new GraphQLNonNull(GraphQLString) },
        number: { type: new GraphQLNonNull(GraphQLInt) },
        salish: { type: new GraphQLNonNull(GraphQLString)},
        nicodemus: { type: new GraphQLNonNull(GraphQLString)},
        english: { type: new GraphQLNonNull(GraphQLString)},
        userId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent,args) {
        Root.update(
          {
            active: 'N'
          },
          {returning: true, where: {id: args.id} }
        );
        let root = new Root({
          root: args.root,
          number: args.number,
          salish: args.salish,
          nicodemus: args.nicodemus,
          english: args.english,
          active: 'Y',
          prevId: args.id,
          userId: args.userId
        });
        return root.save();
        // .then(function([ rowsUpdated, [updatedRoot] ]) {
        //   return(updatedRoot);
        // });
      }
    },
		addUser: {
			type: UserType,
			args: {
				first: { type: new GraphQLNonNull(GraphQLString) },
				last: { type: new GraphQLNonNull(GraphQLString) },
				username: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				roles: { type: new GraphQLNonNull(GraphQLString) }
				},
			resolve(parent,args){
				let user = new User ({
					first: args.first,
					last: args.last,
					username: args.username,
					email: args.email,
					password: args.password,
					roles: args.roles
				});
				return user.save();
			}
		}
	}
});

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
    roles: [String]!
  }
  type UserExists {
    name: String!
    email: String!
    roles: [String]!
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
    addUser_M(name:String!,email:String!,password:String!): User
    updateUser_M(first:String!, last:String!, username:String!,email:String!,password:String!): User
    updateUserAdmin_M(id:String!,roles:[String!]!): User

    addAffix_M(type:String!, salish:String!, nicodemus:String!, english:String!, link:String!, page:String!, roles:[String!]!): Affix
    updateAffix_M(type:String!, salish:String!, nicodemus:String!, english:String!, link:String!, page:String!, roles:[String!]!): Affix
    deleteAffix_M(id:ID!, roles:[String!]!): Affix

    addRoot_M(root:String!, number:Int!, salish:String!, nicodemus:String!, english:String!, roles:[String!]!): Root
    updateRoot_M(root:String!, number:Int!, salish:String!, nicodemus:String!, english:String!, roles:[String!]!): Root
    deleteRoot_M(id:ID!, roles:[String!]!): Root

    addStem_M(category:String!, reichard:String!, doak:String!, salish:String!, nicodemus:String!, english:String!, note:String!, roles:[String!]!): Stem
    updateStem_M(category:String!, reichard:String!, doak:String!, salish:String!, nicodemus:String!, english:String!, note:String!, roles:[String!]!): Stem
    deleteStem_M(id:ID!, roles:[String!]!): Stem
  }

`;

const resolvers = {
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
    addAffix_M: (_, args, context) => addAffix_R(context, args,  ["admin","owner"], addAffix_C),
    addRoot_M: (_, args, context) => addRoot_R(      context, args, ["admin","owner"], addRoot_C),
    addStem_M: (_, args, context) => addStem_R(      context, args, ["admin","owner"], addStem_C),
  }
};

module.exports = new makeExecutableSchema({ typeDefs, resolvers });

// module.exports = new GraphQLSchema({
//   query: BaseQuery,
//   mutation: Mutation
// });
