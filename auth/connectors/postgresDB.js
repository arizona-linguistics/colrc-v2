// ORM (Object-Relational Mapper library)
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:__dirname+'./../.env'});
const axios = require('axios');
const _ = require('lodash');
const { noRoleError } = require('../errors/error');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: false
    },
    //operatorsAliases: false,
    pool: { max: 5, min: 0, acquire: 300000, idle: 10000 },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      timestamps: true
    },
    //logging:false
  }
);

sequelize
.authenticate()
.then(() => {
  console.log('connected to POSTGRES database');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


const userRole = "user";
const adminRole = "admin";

const createJwtToken = (body, options) => jwt.sign(body, process.env.JWT_PRIVATE_KEY, options);

const User = sequelize.define('user', {
  first: { type: Sequelize.STRING },
  last: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING, unique: true },
  password: { type: Sequelize.STRING },
  //roles: { type: Sequelize.STRING },
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

const Role = sequelize.define('role', {
  role_code: { type: Sequelize.STRING },
  role_value: { type: Sequelize.STRING },
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

const UserToRoleRelation = sequelize.define('user_roles', {
  userId: { type: Sequelize.INTEGER },
  roleId: { type: Sequelize.INTEGER },
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

User.belongsToMany(Role, {
  through: 'user_roles',
  foreignKey: 'userId', 
  otherKey: 'roleId'
});
Role.belongsToMany(User, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
});

const loginUser_C = input => {
  //console.log(input)
  return User.findOne({
    where: { email: input.email, password: input.password },
    include: Role 
  }).then(user => {
    //console.log("we have results")
    //console.log(user)
    //console.log("=========")
    //console.log(user.roles)
    console.log(user.email)
    console.log(user.username)
    hasura_roles = []
    default_role = ''
    user.roles.forEach(function(role) {
      hasura_roles.push(role.role_code)
      if (role.role_code === 'manager'){
        default_role = 'manager'
      }
      if (default_role !== 'manager' && role.role_code === 'update') {
        default_role = 'update'
      }
      if (default_role !== 'manager' && default_role !== 'update') {
        default_role = role.role_code
      }
    })
    // console.log(hasura_roles)
    // console.log(default_role)
    if (user) {
      return [{
        password: createJwtToken(
          {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "application.name": 'colrc',
            "https://hasura.io/jwt/claims": {
              "x-hasura-allowed-roles": hasura_roles,
              "x-hasura-default-role": default_role,
              "x-hasura-user-id": user.id.toString()
            }
          }, 
          { 
            algorithm: process.env.ALGORITHM,
            expiresIn: process.env.EXPIRES_IN
          }
        )
      }]
    } // if
  }) // then
  // do not feed password back to query, password stays in database
}

const getUserFromToken_C = input => {
  // console.log("I am getting in the getUserFromToken_C function")
  return User.findOne({
    where: { id: input.myid },
    include: Role 
  })
  .then(user => {
    // user.dataValues.roles = user.dataValues.roles.split(',')
    // console.log("User from getUserFromToken_C", user)
    return user.dataValues
  })
}

const addUser_C = input => {
  input.roles = ["view"]; // assign a dummy roles at first time user is created
  let user = new User(input);
  return User.findOne({
    where: { email: input.email }
  }).then((res) => {
    if(res) {
      return {first:"", last:"", username:"",email:"", password: "", roles:""};
    } else {
      return User.create({ first:input.first, last:input.last, username: input.username, email: input.email, password: input.password, roles: input.roles.join(",") })
         .then(res => {
            // res.dataValues.roles = res.dataValues.roles.split(',')
            return res.dataValues
          })
    }
  });
}

const isHuman_C = input => {
  console.log("I am getting in the isHuman_C function")
  console.log("the token is:", input.token)
  const secret = process.env.RECAPTCHA_SECRET_KEY
  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${input.token}`)
  .then(function (response) {
    console.log(response.data);
    return { "token": response.data.success }
  })
  .catch(function (error) {
    console.log(error);
    return { "token": false }
  });
}

module.exports = {
  User,
  loginUser_C,
  addUser_C,
  getUserFromToken_C,
  isHuman_C,
};
