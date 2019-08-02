// ORM (Object-Relational Mapper library)
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:__dirname+'/./../../.env'});
const _ = require('lodash');
const { noRoleError } = require('./../errors/error');

// ****** Set up default MYSQL connection START ****** //
// see https://github.com/sequelize/sequelize/blob/7a6cc32ffb4d25581d9cf365f6988a50d8eff56a/lib/sequelize.js#L52
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
    logging:false
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
  editnote: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  prevId: { type: Sequelize.INTEGER },
  userId: { type: Sequelize.STRING }
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

const Bibliography = sequelize.define('bibliography', {
  author: { type: Sequelize.STRING },
  year: { type: Sequelize.STRING },
  title: { type: Sequelize.STRING },
  reference: { type: Sequelize.STRING },
  link: { type: Sequelize.STRING },
  linktext: { type: Sequelize.STRING },
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
  editnote: { type: Sequelize.STRING },
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
  editnote: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  prevId: { type: Sequelize.INTEGER },
  userId: { type: Sequelize.STRING }
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

Stem.belongsTo(User, { foreignKey: 'userId' });

const Spelling = sequelize.define('spelling', {
  reichard: { type: Sequelize.STRING },
  nicodemus: { type: Sequelize.STRING },
  salish: { type: Sequelize.STRING },
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

const Vowel = sequelize.define('vowel', {
  orthography: { type: Sequelize.STRING },
  height: { type: Sequelize.STRING },
  front: { type: Sequelize.STRING },
  central: { type: Sequelize.STRING },
  back: { type: Sequelize.STRING }    
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

const Consonant = sequelize.define('consonant', {
  orthography: { type: Sequelize.STRING },
  voice: { type: Sequelize.STRING },
  manner: { type: Sequelize.STRING },
  secondary: { type: Sequelize.STRING },
  labial: { type: Sequelize.STRING },
  alveolar: { type: Sequelize.STRING },
  alveopalatal: { type: Sequelize.STRING },
  lateral: { type: Sequelize.STRING },
  palatal: { type: Sequelize.STRING },
  velar: { type: Sequelize.STRING },
  uvular: { type: Sequelize.STRING },
  glottal: { type: Sequelize.STRING },
  pharyngeal: { type: Sequelize.STRING }    
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

const Text = sequelize.define('text', {
  title: { type: Sequelize.STRING },
  speaker: { type: Sequelize.STRING },
  cycle: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  prevId: { type: Sequelize.INTEGER },
  userId: { type: Sequelize.STRING }   
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});
Text.belongsTo(User, { foreignKey: 'userId' });

const Textfile = sequelize.define('textfile', {
  subdir: { type: Sequelize.STRING },
  src: { type: Sequelize.STRING },
  resType: { type: Sequelize.STRING },
  msType: { type: Sequelize.STRING },
  fileType: { type: Sequelize.STRING },
  textID: { type: Sequelize.STRING }, 
  active: { type: Sequelize.STRING(1) },
  prevId: { type: Sequelize.INTEGER },
  userId: { type: Sequelize.STRING }   
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});
Textfile.belongsTo(User, { foreignKey: 'userId' });
Textfile.belongsTo(Text, { foreignKey: 'textId' });

const Textimage = sequelize.define('textimage', {
  textfileId: { type: Sequelize.STRING },
  subdir: { type: Sequelize.STRING },
  src: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  prevId: { type: Sequelize.INTEGER },
  userId: { type: Sequelize.STRING }   
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});
Textimage.belongsTo(User, { foreignKey: 'userId' });
Textimage.belongsTo(Textfile, { foreignKey: 'textfileId' });

const Audiofile = sequelize.define('audiofile', {
  subdir: { type: Sequelize.STRING },
  src: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  direct: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  userId: { type: Sequelize.STRING }   
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});
Audiofile.belongsTo(User, { foreignKey: 'userId' });
// then an audioset type
const Audioset = sequelize.define('audioset', {
  title: { type: Sequelize.STRING },
  speaker: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  textId: { type: Sequelize.STRING },
  userId: { type: Sequelize.STRING }   
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});
Audioset.belongsTo(User, { foreignKey: 'userId' });

const Audiorelation = sequelize.define('audiorelation', {
  audiosetId: { type: Sequelize.STRING, unique: 'audio' },
  audiofileId: { type: Sequelize.STRING, unique: 'audio' },
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});

// Set up relationships that will be used later
Audioset.belongsToMany( Audiofile, {
  //as: [SetToFile],
  through: "audiorelations", //this can be string or a model,
  foreignKey: 'AudiosetId'
})
Audiofile.belongsToMany( Audioset, {
  //as: [FileToSet],
  through: "audiorelations",
  foreignKey: 'AudiofileId'
})
// then an elicitations type
const Elicitationrelation = sequelize.define('elicitationrelation', {
  elicitationsetId: { type: Sequelize.STRING, unique: 'elicitation' },
  elicitationfileId: { type: Sequelize.STRING, unique: 'elicitation' },
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});
const Elicitationset = sequelize.define('elicitationset', {
  title: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  userId: { type: Sequelize.STRING }, 
  prevId: { type: Sequelize.INTEGER }   
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});
Elicitationset.belongsTo(User, { foreignKey: 'userId' });

const Elicitationfile = sequelize.define('elicitationfile', {
  src: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  direct: { type: Sequelize.STRING },
  active: { type: Sequelize.STRING(1) },
  userId: { type: Sequelize.STRING }   
},
{
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci'
});
Elicitationfile.belongsTo(User, { foreignKey: 'userId' });

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
  //console.log(input)
  return User.findOne({
    where: { email: input.email, password: input.password }
  }).then(res => {
    //console.log("we have results")
    //console.log(res)
    if(res) {
      //console.log("This has data")
      //console.log(res)
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

const getUserFromToken_C = input => {
  // don't let user update his own role, only admin can update roles
  return User.findOne({
    where: { id: input.myid }
  })
  .then(user => {
    // user.dataValues.roles = user.dataValues.roles.split(',')
    return user.dataValues
  })
};


const updateUser_C = input => {
  // don't let user update his own role, only admin can update roles
  return User.findOne({
    where: { id: input.myid }
  })
  .then(user => {
    return user.update({ first:input.first, last:input.last, username: input.username, email: input.email, password: input.password }, { where: { id: input.myid } })
  })
  .then(res => {
    // res.dataValues.roles = res.dataValues.roles.split(',')
    return res.dataValues
  })
};

const updateUserAdmin_C = input => {
  //console.log("input:"+input)
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    console.log(res.dataValues.roles)
    //console.log(input.expectedRoles)
    if (_.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >= 1)
    {
      console.log("I passed the roles test")
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
        //moduser.dataValues.roles = moduser.dataValues.roles.split(',')
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
        editnote: input.editnote,
        active: 'Y',
        prevId: null,
        userId: res.dataValues.id
      });
      return affix.save()
    } //if
    else {
      throw new noRoleError
    }
  }) //then
} //addAffix_C

const addBibliography_C = input => {
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){
      let bibliography = new Bibliography ({
        author: input.author,
        year: input.year,
        title: input.title,
        reference: input.reference,
        link: input.link,
        linktext: input.linktext,
        active: 'Y',
        prevId: null,
        userId: res.dataValues.id
      });
      return bibliography.save()
    } //if
    else {
      throw new noRoleError
    }
  }) //then
} //addBibliography_C

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
        editnote: input.editnote,
        active: 'Y',
        prevId: null,
        userId: res.dataValues.id
      });
      return root.save();
    } //if
    else {
      throw new noRoleError
    }
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
        salish: input.salish,
        note: input.note,
        editnote: input.editnote,
        active: 'Y',
        prevId: null,
        userId: res.dataValues.id
      });
      return stem.save();
    } //if
    else {
      throw new noRoleError
    }
  }) //then
} //addStem_C

const addSpelling_C = input => {
  return User.findOne({
    where: { id: input.myid }
  }).then(res => {
    if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){
      let spelling = new Spelling ({
        reichard: input.reichard,
        nicodemus: input.nicodemus,
        english: input.english,
        salish: input.salish,
        note: input.note,
        active: 'Y',
        prevId: null,
        userId: res.dataValues.id
      });
      return spelling.save();
    } //if
    else {
      throw new noRoleError
    }
  }) //then
} //addSpelling_C

const deleteSpelling_C = input => {
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    if (_.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >= 1)
    {
      return Spelling.findOne({
        where: { id: input.id }
      })
      .then(spelling => {
        return spelling.update({ active:'N' },
        { where: { id: input.id } })
      })
      .then(modspelling => {
        return modspelling.dataValues
      })
    } else {
      throw new noRoleError();
    }
  })
};

const updateSpelling_C = input => {
  return sequelize.transaction(t => {
    return User.findOne({
      where: { id: input.myid },
      transaction: t
    })
    .then(res => {
      if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){
        return Spelling.findOne(
          {
            where: { id: input.id},
            lock: t.LOCK.UPDATE,
            transaction: t
          }
        )
        .then( spelling => {
          // Found a spelling, now 'delete' it
          spelling.active = 'N'
          return spelling.save({transaction: t})
        })
        .then( () => {
          // 'deleted' the old spelling, now add the new spelling
          let newSpelling = new Spelling({
              reichard: input.reichard,
              salish: input.salish,
              nicodemus: input.nicodemus,
              english: input.english,
              note: input.note,
              active: 'Y',
              prevId: input.id,
              userId: input.myid
          })
          return newSpelling.save({transaction: t})
        })
        .then(newspelling=> {
          //console.log(newspelling.dataValues)
          return newspelling.dataValues
        })
        .catch(err => {
          return err
        })
      } // if
      else {
        throw new noRoleError
      }
    }) //transaction
  }) //then
} //updateSpelling_C

const deleteAffix_C = input => {
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    if (_.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >= 1)
    {
      return Affix.findOne({
        where: { id: input.id }
      })
      .then(affix => {
        return affix.update({ active:'N' },
        { where: { id: input.id } })
      })
      .then(modaffix => {
        return modaffix.dataValues
      })
    } else {
      throw new noRoleError();
    }
  })
};

const deleteBibliography_C = input => {
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    if (_.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >= 1)
    {
      return Bibliography.findOne({
        where: { id: input.id }
      })
      .then(bibliography => {
        return bibliography.update({ active:'N' },
        { where: { id: input.id } })
      })
      .then(modbibliography => {
        return modbibliography.dataValues
      })
    } else {
      throw new noRoleError();
    }
  })
};

const deleteRoot_C = input => {
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    if (_.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >= 1)
    {
      return Root.findOne({
        where: { id: input.id }
      })
      .then(root => {
        return root.update({ active:'N' },
        { where: { id: input.id } })
      })
      .then(modroot => {
        return modroot.dataValues
      })
    } else {
      throw new noRoleError();
    }
  })
};

const deleteStem_C = input => {
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    if (_.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >= 1)
    {
      return Stem.findOne({
        where: { id: input.id }
      })
      .then(stem => {
        return stem.update({ active:'N' },
        { where: { id: input.id } })
      })
      .then(modstem => {
        return modstem.dataValues
      })
    } else {
      throw new noRoleError();
    }
  })
};

const updateAffix_C = input => {
  return sequelize.transaction(t => {
    return User.findOne({
      where: { id: input.myid },
      transaction: t
    })
    .then(res => {
      if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){

        return Affix.findOne(
          {
            where: { id: input.id},
            lock: t.LOCK.UPDATE,
            transaction: t
          }
        )
        .then( affix => {
          // Found an affix, now 'delete' it
          affix.active = 'N'
          return affix.save({transaction: t})
        })
        .then( () => {
          // 'deleted' the old affix, now add the new affix
          let newAffix = new Affix({
              type: input.type,
              salish: input.salish,
              nicodemus: input.nicodemus,
              english: input.english,
              link: input.link,
              page: input.page,
              editnote: input.editnote,
              active: 'Y',
              prevId: input.id,
              userId: input.myid
          })
          return newAffix.save({transaction: t})
        })
        .then(newaffix => {
          //console.log(newaffix.dataValues)
          return newaffix.dataValues
        })
        .catch(err => {
          return err
        })
      } // if
      else {
        throw new noRoleError
      }
    }) //transaction
  }) //then
} //updateAffix_C

const updateBibliography_C = input => {
  return sequelize.transaction(t => {
    return User.findOne({
      where: { id: input.myid },
      transaction: t
    })
    .then(res => {
      if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){

        return Bibliography.findOne(
          {
            where: { id: input.id},
            lock: t.LOCK.UPDATE,
            transaction: t
          }
        )
        .then( bibliography => {
          // Found an bibliography, now 'delete' it
          bibliography.active = 'N'
          return bibliography.save({transaction: t})
        })
        .then( () => {
          // 'deleted' the old bibliography, now add the new bibliography
          let newBibliography = new Bibliography({
              author: input.author,
              year: input.year,
              title: input.title,
              reference: input.reference,
              link: input.link,
              linktext: input.linktext,
              active: 'Y',
              prevId: input.id,
              userId: input.myid
          })
          return newbibliography.save({transaction: t})
        })
        .then(newbibliography => {
          //console.log(newbibliography.dataValues)
          return newbibliography.dataValues
        })
        .catch(err => {
          return err
        })
      } // if
      else {
        throw new noRoleError
      }
    }) //transaction
  }) //then
} //updateBibliography_C


const updateRoot_C = input => {
  return sequelize.transaction(t => {
    return User.findOne({
      where: { id: input.myid },
      transaction: t
    })
    .then(res => {
      if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){

        return Root.findOne(
          {
            where: { id: input.id},
            lock: t.LOCK.UPDATE,
            transaction: t
          }
        )
        .then( root => {
          // Found a root, now 'delete' it
          root.active = 'N'
          return root.save({transaction: t})
        })
        .then( () => {
          // 'deleted' the old root, now add the new root
          let newRoot = new Root({
              root: input.root,
              number: input.number,
              salish: input.salish,
              nicodemus: input.nicodemus,
              english: input.english,
              editnote: input.editnote,
              active: 'Y',
              prevId: input.id,
              userId: input.myid
          })
          return newRoot.save({transaction: t})
        })
        .then(newroot => {
          //console.log(newroot.dataValues)
          return newroot.dataValues
        })
        .catch(err => {
          return err
        })
      } // if
      else {
        throw new noRoleError
      }
    }) //transaction
  }) //then
} //updateRoot_C

const updateStem_C = input => {
  return sequelize.transaction(t => {
    return User.findOne({
      where: { id: input.myid },
      transaction: t
    })
    .then(res => {
      if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){
        return Stem.findOne(
          {
            where: { id: input.id},
            lock: t.LOCK.UPDATE,
            transaction: t
          }
        )
        .then( stem => {
          // Found a stem, now 'delete' it
          stem.active = 'N'
          return stem.save({transaction: t})
        })
        .then( () => {
          // 'deleted' the old stem, now add the new stem
          let newStem = new Stem({
              category: input.category,
              reichard: input.reichard,
              doak: input.doak,
              salish: input.salish,
              nicodemus: input.nicodemus,
              english: input.english,
              note: input.note,
              editnote: input.editnote,
              active: 'Y',
              prevId: input.id,
              userId: input.myid
          })
          return newStem.save({transaction: t})
        })
        .then(newstem => {
          //console.log(newstem.dataValues)
          return newstem.dataValues
        })
        .catch(err => {
          return err
        })
      } // if
      else {
        throw new noRoleError
      }
    }) //transaction
  }) //then
} //updateStem_C

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

const bibliographies_C = input => {
  return Bibliography.findAll({
    where: { }
  })
}

const bibliography_C = input => {
  return Bibliography.findOne({
    where: { id: input.id }
  })
}

const root_C = input => {
  return Root.findOne({
    where: { id: input.id }
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

const users_C = input => {
  return User.findOne({
    where: { id: input.myid }
  })
  .then(res => {
    if ( _.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >=1){
      return User.findAll({
        where: { }
      })
    } else {
      throw new noRoleError
    }
  })
  .catch(error => {
    return(error)
  })
}

const spelling_C = input => {
  return Spelling.findOne({
    where: { id: input.id }
  })
}

const spellings_C = input => {
  return Spelling.findAll({
    where: { }
  })
}

const consonants_C = input => {
  return Consonant.findAll({
    where: { }
  })
}
const vowels_C = input => {
  return Vowel.findAll({
    where: { }
  })
}
const text_C = input => {
  return Text.findOne({
    where: { id: input.id }
  })
}
const texts_C = input => {
  return Text.findAll({
    where: { }
  })
}
const textfile_C = input => {
  return Textfile.findOne({
    where: { id: input.id }
  })
}
const textfiles_C = input => {
  return Textfile.findAll({
    where: { }
  })
}
const textimage_C = input => {
  return Textimage.findOne({
    where: { id: input.id }
  })
}
const textimages_C = input => {
  return Textimage.findAll({
    where: { }
  })
}
const audiofile_C = input => {
  return Audiofile.findOne({
    where: { id: input.id }
  })
}
const audiofiles_C = input => {
  return Audiofile.findAll({
    where: { }
  })
}
const audioset_C = input => {
  return Audioset.findOne({
    where: { id: input.id }
  })
}
const audiosets_C = input => {
  return Audioset.findAll({
    where: { }
  })
}

const audiorelation_C = input => {
  return Audiorelation.findOne({
    where: { id: input.id }
  })
}
const audiorelations_C = input => {
  return Audiorelation.findAll({
    where: { }
  })
}
const elicitationfile_C = input => {
  return Elicitationfile.findOne({
    where: { id: input.id }
  })
}
const elicitationfiles_C = input => {
  return Elicitationfile.findAll({
    where: { }
  })
}
const elicitationset_C = input => {
  return Elicitationset.findOne({
    where: { id: input.id }
  })
}
const elicitationsets_C = input => {
  return Elicitationset.findAll({
    where: { }
  })
}
const elicitationrelation_C = input => {
  return Elicitationrelation.findOne({
    where: { id: input.id }
  })
}
const elicitationrelations_C = input => {
  return Elicitationrelation.findAll({
    where: { }
  })
}
module.exports = {
  Root,
  User,
  Affix,
  Stem,
  Bibliography,
  Spelling,
  Consonant,
  Vowel,
  Text,
  Textfile,
  Textimage,
  Audiofile,
  Audioset,
  Audiorelation,
  Elicitationfile,
  Elicitationset,
  Elicitationrelation,
  sequelize,
  authenticateUser_C,
  checkUserExists_C,
  loginUser_C,
  getUserFromToken_C,
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
  updateSpelling_C,
  updateStem_C,
  affix_C,
  affixes_C,
  bibliography_C,
  bibliographies_C,
  root_C,
  roots_C,
  stem_C,
  stems_C,
  users_C,
  spelling_C,
  spellings_C,
  consonants_C,
  vowels_C,
  text_C,
  texts_C,
  textfile_C,
  textfiles_C,
  textimage_C,
  textimages_C,
  audiofile_C,
  audiofiles_C,
  audioset_C,
  audiosets_C,
  audiorelation_C,
  audiorelations_C,
  elicitationfile_C,
  elicitationfiles_C,
  elicitationset_C,
  elicitationsets_C,
  elicitationrelation_C,
  elicitationrelations_C,
};
