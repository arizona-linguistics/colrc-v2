// ORM (Object-Relational Mapper library)
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:__dirname+'/./../../misc/.env'});
const _ = require('lodash');
const { noRoleError } = require('./../errors/error');

// ****** Set up default MYSQL connection START ****** //
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: (process.env.DB_DIALECT || "mysql"),
    //operatorsAliases: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      timestamps: true
    },
    //logging:false
  });

sequelize
.authenticate()
.then(() => {
  console.log('connected to MYSQL- COLRC database');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
// ****** Set up default MYSQL connection END ****** //

//
// Root model for sequelize
//
const Root = sequelize.define('root', {
  root: { type: Sequelize.STRING },
  number: { type: Sequelize.INTEGER },
  salish: { type: Sequelize.STRING },
  nicodemus: { type: Sequelize.STRING },
  english: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  prevId: { type: Sequelize.INTEGER },
  userId: { type: Sequelize.STRING }
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

const User = sequelize.define('user', {
  first: { type: Sequelize.STRING },
  last: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  roles: { type: Sequelize.STRING },
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

Root.belongsTo(User, { foreignKey: 'userId' });

const Affix = sequelize.define('affix', {
  type: { type: Sequelize.STRING },
  salish: { type: Sequelize.STRING },
  nicodemus: { type: Sequelize.STRING },
  english: { type: Sequelize.STRING },
  link: { type: Sequelize.STRING },
  page: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  prevId: { type: Sequelize.INTEGER },
  userId: { type: Sequelize.STRING }
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

Affix.belongsTo(User, { foreignKey: 'userId' });

const Stem = sequelize.define('stem', {
  category: { type: Sequelize.STRING },
  reichard: { type: Sequelize.STRING },
  doak: { type: Sequelize.STRING },
  salish: { type: Sequelize.STRING },
  nicodemus: { type: Sequelize.STRING },
  english: { type: Sequelize.STRING },
  note: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  prevId: { type: Sequelize.INTEGER },
  userId: { type: Sequelize.STRING }
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

Stem.belongsTo(User, { foreignKey: 'userId' });

const authenticateUser_C = input => {
  //return User.find({ _id: input.id }, { roles: 1 }); // do not feed password back to query, password stays in database
  return User.findOne({
    where: { id: input.id }
  }).then((res) => {
    return [{
      id: res.dataValues.id,
      first: res.dataValues.first,
      last: res.dataValues.last,
      password: res.dataValues.password,
      username: res.dataValues.username,
      email: res.dataValues.email,
      roles: res.dataValues.roles.split(',')
    }];
  }
  );
};
const checkUserExists_C = input => {
  //return User.find({ email: input.email }, { name:1, email: 1, roles: 1 });
  return User.findOne({
    where: { email: input.email }
  }).then((res) => {
    return [{
      username: res.dataValues.username,
      email: res.dataValues.email,
      roles: res.dataValues.roles.split(',')
    }];
  }
  );
};

const loginUser_C = input => {
  console.log(input)
  return User.findOne({
    where: { email: input.email, password: input.password }
  }).then(res => {
    console.log("we have results")
    console.log(res)
    if(res) {
      console.log("This has data")
      console.log(res)
      return [{
        password: jwt.sign(
          { id: res.dataValues.id, email: res.dataValues.email, username: res.dataValues.username },
          process.env.JWT_SECRET,
          { expiresIn: '3d' }
        )
      }]
    } // if
  }) // then
  // do not feed password back to query, password stays in database
}

const addUser_C = input => {
  input.roles = ["dummy"]; // assign a dummy roles at first time user is created
  let user = new User(input);
  return User.findOne({
    where: { email: input.email }
  }).then((res) => {
    if(res) {
      return {first:"", last:"", username:"",email:"", password: "", roles:""};
    } else {
      return User.create({ first:input.first, last:input.last, username: input.username, email: input.email, password: input.password, roles: input.roles.join(',') }).then((res) => {
        return input;
      });
    }
  });
}

const updateUser_C = input => {
  // don't let user update his own role, only admin can update roles
  return User.findOne({
    where: { id: input.myid }
  })
  .then(user => {
    return user.update({ first:input.first, last:input.last, username: input.username, email: input.email, password: input.password }, { where: { id: input.myid } })
  })
  .then(res => {
    res.dataValues.roles = res.dataValues.roles.split(',')
    return res.dataValues
  })
};

const updateUserAdmin_C = input => {
  //console.log("input:"+input)
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    //console.log(res.dataValues.roles)
    //console.log(input.expectedRoles)
    if (_.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >= 1)
    {
      //console.log("I passed the roles test")
      // don't let user update his own role, only admin can update roles
      return User.findOne({
        where: { id: input.id }
      })
      .then(user => {
        return user.update({ roles: input.roles.join(',') }, { where: { id: input.id } })
      })
      .then(moduser => {
        //console.log("I have a modified user")
        //console.log(moduser)
        moduser.dataValues.roles = moduser.dataValues.roles.split(',')
        return moduser.dataValues
      })
    } else {
      //throw new noRoleError();
    }
  })
};

const addAffix_C = input => {
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){
      let affix = new Affix ({
        type: input.type,
        salish: input.salish,
        nicodemus: input.nicodemus,
        english: input.english,
        link: input.link,
        page: input.page,
        active: 'Y',
        prevId: input.affixId,
        userId: res.dataValues.id
      });
      return affix.save();
    } //if
  }) //then
} //addAffix_C

const addRoot_C = input => {
  return User.findOne({
    where: { id: input.myid }
  }).then(res => {
    if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){
      let root = new Root ({
        root: input.root,
        number: input.number,
        salish: input.salish,
        nicodemus: input.nicodemus,
        english: input.english,
        active: 'Y',
        prevId: input.rootId,
        user: res
      });
      return root.save();
    } //if
  }) //then
} //addRoot_C

const addStem_C = input => {
  return User.findOne({
    where: { id: input.myid }
  }).then(res => {
    if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){
      let stem = new Stem ({
        category: input.category,
        reichard: input.reichard,
        doak: input.doak,
        nicodemus: input.nicodemus,
        english: input.english,
        note: input.note,
        active: 'Y',
        prevId: input.stemId,
        user: res
      });
      return stem.save();
    } //if
  }) //then
} //addStem_C


const affix_C = input => {
  return Affix.findOne({
    where: { id: input.id }
  })
}

const affixes_C = input => {
  return Affix.findAll({
    where: { }
  })
}

const root_C = input => {
  console.log(input)
  return Root.findOne({
    where: { id: input.id }
  })
  .then(res => {
    return {
      id: res.dataValues.id,
      root: res.root,
      number: res.number,
      salish: res.salish,
      nicodemus: res.nicodemus,
      english: res.english,
      active: 'Y',
      prevId: res.rootId,
      user: res.user
    }
  })
}

const roots_C = input => {
  return Root.findAll({
    where: { }
  })
}

const stem_C = input => {
  return Stem.findOne({
    where: { id: input.id }
  })
}

const stems_C = input => {
  return Stem.findAll({
    where: { }
  })
}


module.exports = {
  Root,
  User,
  Affix,
  Stem,
  sequelize,
  authenticateUser_C,
  checkUserExists_C,
  loginUser_C,
  addUser_C,
  updateUser_C,
  updateUserAdmin_C,
  addAffix_C,
  addRoot_C,
  addStem_C,
  affix_C,
  affixes_C,
  root_C,
  roots_C,
  stem_C,
  stems_C,
};
