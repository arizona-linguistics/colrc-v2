const express = require("express");
const app = express();
const assert = require("assert");
// store config variables in dotenv
require("dotenv").config();
// ORM (Object-Relational Mapper library)
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const path = require("path");
const { active } = require("./Data");
const dataPath = path.resolve(__dirname, "Data");
const txtMetaPath = path.resolve(__dirname, "data", "metadata_tables");
const audioMetaPath = path.resolve(__dirname, "data", "metadata_audio");
const data = require(dataPath);
const textFileMetaDatafile = require(txtMetaPath);
const audioSetMetaDatafile = require(audioMetaPath);

// const data = require('./Data');
// const textFileMetaDatafile = require('./data/metadata_tables')
// const audioSetMetaDatafile = require('./data/metadata_audio')
// const express = require('express');
// const app = express();
// const assert = require('assert');
// // store config variables in dotenv
// require('dotenv').config();
// // ORM (Object-Relational Mapper library)
// const Sequelize = require('sequelize');

/* const pg = require('pg');
var client = new pg.Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  host: process.env.DB_HOST,
  ssl: true
});
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});
const Query = require('pg').Query
const query = new Query('select now()')
const result = client.query(query)
assert(query === result) // true
query.on('row', row => {
  console.log('row!', row) // { the time }
})
query.on('end', () => {
  console.log('query done')
})
query.on('error', err => {
  console.error(err.stack)
}) */

// ****** Set up default MYSQL connection START ****** //
console.log(process.env.DB_NAME);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
console.log(process.env.DB_DIALECT);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: false,
    },
    //operatorsAliases: false,
    pool: { max: 5, min: 0, acquire: 300000, idle: 10000 },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      timestamps: true,
    },
    //logging:false
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to POSTGRES- COLRC database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
// ****** Set up default POSTGRES connection END ****** //

// *** set the variables needed for auditing *** //
async function setSessionVariables() {
  const hasura_user = '{"x-hasura-role": "manager", "x-hasura-user-id": "1"}';
  const [results, metadata] = await sequelize.query(
    "SET application_name to 'colrc'"
  );
  const [results2, metadata2] = await sequelize.query(
    `SET hasura."user" to '${hasura_user}'`
  );
}

// first provide all the fundamental types
const User = sequelize.define(
  "user",
  {
    first: { type: Sequelize.TEXT },
    last: { type: Sequelize.TEXT },
    username: { type: Sequelize.TEXT },
    email: { type: Sequelize.TEXT, unique: true },
    password: { type: Sequelize.TEXT },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Role = sequelize.define(
  "role",
  {
    role_code: { type: Sequelize.TEXT, unique: true },
    role_value: { type: Sequelize.TEXT, unique: true },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const UserToRoleRelation = sequelize.define(
  "user_roles",
  {
    userId: { type: Sequelize.INTEGER },
    roleId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

const Active = sequelize.define(
  "active",
  {
    value: { type: Sequelize.TEXT, unique: true },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Root = sequelize.define(
  "root",
  {
    root: { type: Sequelize.TEXT },
    number: { type: Sequelize.INTEGER },
    sense: { type: Sequelize.TEXT },
    salish: { type: Sequelize.TEXT },
    nicodemus: { type: Sequelize.TEXT },
    symbol: { type: Sequelize.TEXT },
    english: { type: Sequelize.TEXT },
    grammar: { type: Sequelize.TEXT },
    crossref: { type: Sequelize.TEXT },
    variant: { type: Sequelize.TEXT },
    cognate: { type: Sequelize.TEXT },
    editnote: { type: Sequelize.TEXT },
    //active: { type: Sequelize.TEXT },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Affix = sequelize.define(
  "affix",
  {
    type: { type: Sequelize.INTEGER },
    salish: { type: Sequelize.TEXT },
    nicodemus: { type: Sequelize.TEXT },
    english: { type: Sequelize.TEXT },
    link: { type: Sequelize.TEXT },
    page: { type: Sequelize.TEXT },
    editnote: { type: Sequelize.TEXT },
    //active: { type: Sequelize.INTEGER },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const AffixTypes = sequelize.define(
  "affix_types",
  {
    value: { type: Sequelize.TEXT, unique: true },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const StemCategories = sequelize.define(
  "stem_categories",
  {
    value: { type: Sequelize.TEXT, unique: true },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Stem = sequelize.define(
  "stem",
  {
    category: { type: Sequelize.INTEGER },
    reichard: { type: Sequelize.TEXT },
    doak: { type: Sequelize.TEXT },
    salish: { type: Sequelize.TEXT },
    nicodemus: { type: Sequelize.TEXT },
    english: { type: Sequelize.TEXT },
    note: { type: Sequelize.TEXT },
    editnote: { type: Sequelize.TEXT },
    //active: { type: Sequelize.TEXT },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Spelling = sequelize.define(
  "spelling",
  {
    reichard: { type: Sequelize.TEXT },
    nicodemus: { type: Sequelize.TEXT },
    salish: { type: Sequelize.TEXT },
    english: { type: Sequelize.TEXT },
    note: { type: Sequelize.TEXT },
    //active: { type: Sequelize.TEXT },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Vowel = sequelize.define(
  "vowel",
  {
    orthography: { type: Sequelize.TEXT },
    height: { type: Sequelize.TEXT },
    front: { type: Sequelize.TEXT },
    central: { type: Sequelize.TEXT },
    back: { type: Sequelize.TEXT },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Consonant = sequelize.define(
  "consonant",
  {
    orthography: { type: Sequelize.TEXT },
    voice: { type: Sequelize.TEXT },
    manner: { type: Sequelize.TEXT },
    secondary: { type: Sequelize.TEXT },
    labial: { type: Sequelize.TEXT },
    alveolar: { type: Sequelize.TEXT },
    alveopalatal: { type: Sequelize.TEXT },
    lateral: { type: Sequelize.TEXT },
    palatal: { type: Sequelize.TEXT },
    velar: { type: Sequelize.TEXT },
    uvular: { type: Sequelize.TEXT },
    glottal: { type: Sequelize.TEXT },
    pharyngeal: { type: Sequelize.TEXT },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Bibliography = sequelize.define(
  "bibliography",
  {
    author: { type: Sequelize.TEXT },
    year: { type: Sequelize.TEXT },
    title: { type: Sequelize.TEXT },
    reference: { type: Sequelize.TEXT },
    link: { type: Sequelize.TEXT },
    linktext: { type: Sequelize.TEXT },
    //active: { type: Sequelize.TEXT },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Text = sequelize.define(
  "text",
  {
    title: { type: Sequelize.TEXT },
    speaker: { type: Sequelize.TEXT },
    cycle: { type: Sequelize.TEXT },
    rnumber: { type: Sequelize.TEXT },
    tnumber: { type: Sequelize.TEXT },
    //active: { type: Sequelize.TEXT },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Textfile = sequelize.define(
  "textfile",
  {
    subdir: { type: Sequelize.TEXT },
    src: { type: Sequelize.TEXT },
    resType: { type: Sequelize.TEXT },
    msType: { type: Sequelize.TEXT },
    fileType: { type: Sequelize.TEXT },
    textId: { type: Sequelize.INTEGER },
    //active: { type: Sequelize.TEXT },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Textimage = sequelize.define(
  "textimage",
  {
    subdir: { type: Sequelize.TEXT },
    src: { type: Sequelize.TEXT },
    textFileId: { type: Sequelize.INTEGER },
    //active: { type: Sequelize.TEXT },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const TextFileMetaData = sequelize.define(
  "textfilemetadata",
  {
    textFileId: { type: Sequelize.INTEGER },
    metadata: { type: Sequelize.TEXT },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Audioset = sequelize.define(
  "audioset",
  {
    title: { type: Sequelize.TEXT },
    speaker: { type: Sequelize.TEXT },
    //active: { type: Sequelize.TEXT },
    textId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Audiofile = sequelize.define(
  "audiofile",
  {
    subdir: { type: Sequelize.TEXT },
    src: { type: Sequelize.TEXT },
    type: { type: Sequelize.TEXT },
    direct: { type: Sequelize.TEXT },
    //active: { type: Sequelize.TEXT },
    audiosetId: { type: Sequelize.INTEGER },
    //prevId: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const AudioSetMetaData = sequelize.define(
  "audiosetmetadata",
  {
    audioSetId: { type: Sequelize.INTEGER },
    metadata: { type: Sequelize.TEXT },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Elicitationset = sequelize.define(
  "elicitationset",
  {
    title: { type: Sequelize.TEXT },
    language: { type: Sequelize.TEXT },
    speaker: { type: Sequelize.TEXT },
    transcription: { type: Sequelize.TEXT },
    editnote: { type: Sequelize.TEXT },
    //active: { type: Sequelize.TEXT },
    userId: { type: Sequelize.INTEGER },
    //prevID: { type: Sequelize.INTEGER }
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

const Elicitationfile = sequelize.define(
  "elicitationfile",
  {
    src: { type: Sequelize.TEXT },
    type: { type: Sequelize.TEXT },
    direct: { type: Sequelize.TEXT },
    elicitationSetId: { type: Sequelize.INTEGER },
    //active: { type: Sequelize.TEXT },
    userId: { type: Sequelize.INTEGER },
  },
  {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

async function makeUsersTable() {
  // force: true will drop the table if it already exists
  await User.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('users')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.users) {
    // Table created
    await User.create({
      first: row.first,
      last: row.last,
      username: row.username,
      email: row.email,
      password: row.password,
    });
  }
}

async function makeRoleTable() {
  await Role.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('roles')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.roles) {
    await Role.create({
      role_code: row.role_code,
      role_value: row.role_value,
    });
  }
}

async function makeUserRolesTable() {
  await UserToRoleRelation.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('user_roles')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.user_roles) {
    await UserToRoleRelation.create({
      userId: row.user,
      roleId: row.role,
    });
  }
}

// async function makeActiveTable() {
//   await Active.sync({force: true})
//   for (row of data.active) {
//     await Active.create({
//       value: row.value
//     })
//   }
// }

async function makeAffixTypesTable() {
  await AffixTypes.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('affix_types')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.affix_types) {
    await AffixTypes.create({
      value: row.value,
    });
  }
}

async function makeStemCategoriesTable() {
  await StemCategories.sync({ force: true });
  const res = await sequelize.query(
    `SELECT audit.audit_table('stem_categories')`,
    { type: QueryTypes.SELECT }
  );
  for (row of data.stem_categories) {
    await StemCategories.create({
      value: row.value,
    });
  }
}

// next, build the Root Dictionary, Affix List and Stem List from files in the 'data' directory
async function makeRootTable() {
  await Root.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('roots')`, {
    type: QueryTypes.SELECT,
  });
  var fs = require("fs");
  var contentpath = path.resolve(__dirname, "data", "fixed_entries_avf.txt");
  var contents = fs.readFileSync(contentpath, "utf8");
  var rows = contents.split("\n");
  for (row of rows) {
    row = row.replace(/(\r)/gm, "");
    columns = row.split(":::");
    if (columns[5]) {
      await Root.create({
        root: columns[2],
        number: columns[3] === "" ? 0 : parseInt(columns[3]),
        sense: columns[4],
        salish: columns[5],
        nicodemus: columns[6],
        symbol: columns[7],
        english: columns[8],
        grammar: columns[9],
        crossref: columns[10],
        variant: columns[11],
        cognate: columns[12],
        editnote: columns[13],
        //active: 1,
        //prevId: Sequelize.NULL,
        userId: "1",
      });
    }
  }
  console.log("I have a roots table");
}

async function makeAffixTable() {
  await Affix.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('affixes')`, {
    type: QueryTypes.SELECT,
  });
  var fs = require("fs");
  var contentpath = path.resolve(__dirname, "data", "affixes_spelled.txt");
  var contents = fs.readFileSync(contentpath, "utf8");
  var rows = contents.split("\n");
  for (row of rows) {
    row = row.replace(/(\r)/gm, "");
    columns = row.split(":::");
    if (columns[2]) {
      let type_code = 1;
      if (columns[0] === "directional") {
        type_code = 1;
      } else if (columns[0] === "locative") {
        type_code = 2;
      } else if (columns[0] === "lexical prefix") {
        type_code = 3;
      } else if (columns[0] === "lexical suffix") {
        type_code = 4;
      }
      await Affix.create({
        type: type_code,
        salish: columns[1],
        nicodemus: columns[2],
        english: columns[3],
        link: columns[4],
        page: columns[5],
        editnote: Sequelize.NULL,
        //active: 1,
        //prevId: Sequelize.NULL,
        userId: "1",
      });
    }
  }
  console.log("I have an affixes table");
}

async function makeStemTable() {
  await Stem.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('stems')`, {
    type: QueryTypes.SELECT,
  });
  var fs = require("fs");
  var contentpath = path.resolve(
    __dirname,
    "data",
    "stems_both_lists_nodoak_spelled.txt"
  );
  var contents = fs.readFileSync(contentpath, "utf8");
  var rows = contents.split("\n");
  for (row of rows) {
    row = row.trim();
    row = row.replace(/(\r)/gm, "");
    columns = row.split(":::");
    if (columns[5]) {
      let category_code = 1;
      if (columns[0] === "verb") {
        category_code = 1;
      } else if (columns[0] === "noun") {
        category_code = 2;
      } else if (columns[0] === "other") {
        category_code = 3;
      }
      await Stem.create({
        category: category_code,
        reichard: columns[2],
        doak: columns[3],
        salish: columns[4],
        nicodemus: columns[5],
        english: columns[6],
        note: columns[7],
        editnote: Sequelize.NULL,
        //active: 'Y',
        //prevId: Sequelize.NULL,
        userId: "1",
      });
    }
  }
  console.log("I have a stems table");
}

// make the bibliography table, using Data.js
async function makeBibliographyTable() {
  await Bibliography.sync({ force: true });
  const res = await sequelize.query(
    `SELECT audit.audit_table('bibliographies')`,
    { type: QueryTypes.SELECT }
  );
  var contents = data.bibliography;
  for (row of data.bibliography) {
    //contents.forEach(async function (row) {
    await Bibliography.create({
      author: row.author,
      year: row.year,
      title: row.title,
      reference: row.reference,
      link: row.link,
      linktext: row.linktext,
      //active: 'Y',
      //prevId: Sequelize.NULL,
      userId: "1",
    });
  }
  console.log("I have a bibliography table");
}

// this table builds the spelling list, using Data.js
async function makeSpellingTable() {
  await Spelling.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('spellings')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.spelling) {
    //data.spelling.forEach(async function (row) {
    await Spelling.create({
      reichard: row.reichard,
      salish: row.salish,
      nicodemus: row.nicodemus,
      english: row.english,
      note: row.note,
      //active: 'Y',
      //prevId: Sequelize.NULL,
      userId: "1",
    });
  }
  console.log("I have a spelling table");
}

// make the consonant chart, using Data.js
async function makeConsonantTable() {
  //console.log(data.consonants)
  await Consonant.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('consonants')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.consonants) {
    //data.consonants.forEach(async function (row) {
    await Consonant.create({
      orthography: row.orthography ? row.orthography : "",
      voice: row.voice ? row.voice : "",
      manner: row.manner ? row.manner : "",
      secondary: row.secondary ? row.secondary : "",
      labial: row.labial ? row.labial : "",
      alveolar: row.alveolar ? row.alveolar : "",
      alveopalatal: row.alveopalatal ? row.alveopalatal : "",
      lateral: row.lateral ? row.lateral : "",
      palatal: row.palatal ? row.palatal : "",
      velar: row.velar ? row.velar : "",
      uvular: row.uvular ? row.uvular : "",
      glottal: row.glottal ? row.glottal : "",
      pharyngeal: row.pharyngeal ? row.pharyngeal : "",
    });
  }
  console.log("I have a consonant table");
}

// make the vowel chart, using Data.js
async function makeVowelTable() {
  await Vowel.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('vowels')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.vowels) {
    //data.vowels.forEach(async function (row) {
    await Vowel.create({
      orthography: row.orthography,
      height: row.height,
      front: row.front,
      central: row.central,
      back: row.back,
    });
  }
  console.log("I have a vowel table");
}
// media tables are next, and these are complicated.
// make the Text table, using Data.js
async function makeTextTable() {
  await Text.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('texts')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.texts) {
    //data.texts.forEach(async function (row) {
    await Text.create({
      title: row.title,
      speaker: row.speaker,
      cycle: row.cycle,
      rnumber: row.rnumber,
      tnumber: row.tnumber,
      //active: 'Y',
      //prevId: Sequelize.NULL,
      userId: 1,
    });
  }
  console.log("I have a texts table");
}

async function makeTextfileTable() {
  await Textfile.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('textfiles')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.textfiles) {
    let newTextfile = await Textfile.create({
      subdir: row.subdir,
      src: row.src,
      resType: row.resType,
      msType: row.msType,
      fileType: row.fileType,
      textId: row.textId,
      //active: 'Y',
      //prevId: Sequelize.NULL,
      userId: 1,
    });
    // let myText = await Text.findOne({  where: {id: row.textId} })
    // await newTextfile.addText(myText)
  }
  console.log("I have a textfiles table");
}

// the textimage table requires the filetoimagerelation table and the textfile table
async function makeTextimageTable() {
  await makeTextfileTable();
  await Textimage.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('textimages')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.textimages) {
    let newTextImage = await Textimage.create({
      subdir: row.subdir,
      src: row.src,
      textFileId: row.textfileId,
      //active: 'Y',
      //prevId: Sequelize.NULL,
      userId: 1,
    });
    // let myTextFile = await Textfile.findOne({  where: {id: row.textfileId} })
    // await newTextImage.addTextfile(myTextFile)
  }
  console.log("I have a textimages table");
}

async function makeTextFileMetaDataTable() {
  await TextFileMetaData.sync({ force: true });
  const res = await sequelize.query(
    `SELECT audit.audit_table('textfilemetadata')`,
    { type: QueryTypes.SELECT }
  );
  for (row of textFileMetaDatafile.metadata) {
    await TextFileMetaData.create({
      textFileId: row.textFileId,
      metadata:
        '{ "originalTitle" : "' +
        row.originalTitle +
        '", \n' +
        '"isVersionofEngl" : "' +
        row.isVersionofEngl +
        '" ,\n' +
        '"isVersionofTyped" : "' +
        row.isVersionofTyped +
        '" ,\n' +
        '"subject" : "' +
        row.subject +
        '" ,\n' +
        '"description" : "' +
        row.description +
        '" ,\n' +
        '"type" : "' +
        row.type +
        '" ,\n' +
        '"source" : "' +
        row.source +
        '" ,\n' +
        '"coverageLang" : "' +
        row.coverageLang +
        '" ,\n' +
        '"coverageTime" : "' +
        row.coverageTime +
        '" ,\n' +
        '"date" : "' +
        row.date +
        '" ,\n' +
        '"modified" : "' +
        row.modified +
        '" ,\n' +
        '"creatorNarrator" : "' +
        row.creatorNarrator +
        '" ,\n' +
        '"creatorInterpreter" : "' +
        row.creatorInterpreter +
        '" ,\n' +
        '"creatorLinguist" : "' +
        row.creatorLinguist +
        '" ,\n' +
        '"creatorCoEditors" : "' +
        row.creatorCoEditors +
        '" ,\n' +
        '"format" : "' +
        row.format +
        '" ,\n' +
        '"identifierArchive" : "' +
        row.identifierArchive +
        '" ,\n' +
        '"identifierColrcUrl" : "' +
        row.identifierColrcUrl +
        '" ,\n' +
        '"identifierColrcNo" : "' +
        row.identifierColrcNo +
        '" ,\n' +
        '"langEng" : "' +
        row.langEng +
        '" ,\n' +
        '"langCrd" : "' +
        row.langCrd +
        '" ,\n' +
        '"langBoth" : "' +
        row.langBoth +
        '" }',
    });
  }
  console.log("I have a textfilemetadata table");
}

async function makeAudioSetMetaDataTable() {
  await AudioSetMetaData.sync({ force: true });
  const res = await sequelize.query(
    `SELECT audit.audit_table('audiosetmetadata')`,
    { type: QueryTypes.SELECT }
  );
  for (row of audioSetMetaDatafile.audiometadata) {
    await AudioSetMetaData.create({
      audioSetId: row.audioSetId,
      metadata:
        '{ "originalTitle" : "' +
        row.originalTitle +
        '", \n' +
        '"isFormatofCrd" : "' +
        row.isFormatofCrd +
        '" ,\n' +
        '"subject" : "' +
        row.subject +
        '" ,\n' +
        '"description" : "' +
        row.description +
        '" ,\n' +
        '"type" : "' +
        row.type +
        '" ,\n' +
        '"source" : "' +
        row.source +
        '" ,\n' +
        '"coverageLang" : "' +
        row.coverageLang +
        '" ,\n' +
        '"coverageTime" : "' +
        row.coverageTime +
        '" ,\n' +
        '"date" : "' +
        row.date +
        '" ,\n' +
        '"creatorLinguist" : "' +
        row.creatorLinguist +
        '" ,\n' +
        '"creatorReader" : "' +
        row.creatorReader +
        '" ,\n' +
        '"format" : "' +
        row.format +
        '" ,\n' +
        '"identifierPermanent" : "' +
        row.identifierPermanent +
        '" ,\n' +
        '"identifierColrcUrl" : "' +
        row.identifierColrcUrl +
        '" ,\n' +
        '"identifierColrcNo" : "' +
        row.identifierColrcNo +
        '" ,\n' +
        '"langCrd" : "' +
        row.langCrd +
        '" \n}',
    });
  }
  console.log("I have a audiosetmetadata table");
}

// make the audioset table
async function makeAudiosetTable() {
  await Audioset.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('audiosets')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.audiosets) {
    let newAudioSet = await Audioset.create({
      title: row.title,
      speaker: row.speaker,
      textId: row.textId === "" ? Sequelize.NULL : row.textId,
      //active: 'Y',
      //prevId: Sequelize.NULL,
      userId: 1,
    });
    // let myText = await Text.findOne({  where: {id: row.textId} })
    // await newAudioSet.addText(myText)
  }
  console.log("I have an audiosets table");
}

// make the audiofile table from Data.js
async function makeAudiofileTable() {
  //await makeAudiosetTable()
  await Audiofile.sync({ force: true });
  const res = await sequelize.query(`SELECT audit.audit_table('audiofiles')`, {
    type: QueryTypes.SELECT,
  });
  for (row of data.audiofiles) {
    let newAudioFile = await Audiofile.create({
      subdir: row.subdir,
      src: row.src,
      type: row.type,
      direct: row.direct,
      //active: 'Y',
      audiosetId: row.audiosetId,
      //prevId: Sequelize.NULL,
      userId: 1,
    });
    // let myAudioSet = await Audioset.findOne({  where: {id: row.audiosetId} })
    // await newAudioFile.addAudioset(myAudioSet)
  }
  console.log("I have an audiofiles table");
}
// make the elicitationset table
async function makeElicitationsetTable() {
  await Elicitationset.sync({ force: true });
  const res = await sequelize.query(
    `SELECT audit.audit_table('elicitationsets')`,
    { type: QueryTypes.SELECT }
  );
  for (row of data.elicitationsets) {
    //data.elicitationsets.forEach(await async function (row) {
    await Elicitationset.create({
      title: row.title,
      language: row.language,
      speaker: row.speaker,
      transcription: row.transcription,
      editnote: Sequelize.NULL,
      //active: 'Y',
      //prevId: Sequelize.NULL,
      userId: 1,
    });
  }
  console.log("I have an elicitationsets table");
}

// make the elicitationfile table from Data.js
async function makeElicitationfileTable() {
  await makeElicitationsetTable();
  await Elicitationfile.sync({ force: true });
  const res = await sequelize.query(
    `SELECT audit.audit_table('elicitationfiles')`,
    { type: QueryTypes.SELECT }
  );
  for (row of data.elicitationfiles) {
    let newElicitationFile = await Elicitationfile.create({
      src: row.src,
      type: row.type,
      direct: row.direct,
      elicitationSetId: row.elicitationId,
      //active: 'Y',
      //prevId: Sequelize.NULL,
      userId: 1,
    });
    // let myElicitationSet = await Elicitationset.findOne({  where: {id: row.elicitationId} })
    // await console.log("Elicitation set id: " + myElicitationSet.id + ", elicitation title: " + myElicitationSet.title)
    // await console.log("Elicitation file id: " + newElicitationFile.id + ", elicitation src: " + newElicitationFile.src)
    // await myElicitationSet.addElicitationfile(newElicitationFile)
  }
  console.log("I have an elicitationfiles table");
}

// Find all users
async function getUsers() {
  const users = await User.findAll();
  // const users = await User.findAll({
  //   attributes: ['name', 'last_seen']
  // });
  console.log(users.every((user) => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
}

async function makeandReadUsers() {
  await makeUsersTable();
  await getUsers();
}

//makeandReadUsers()

// // we can bundle these table builds, but order matters.  Relation tables must come before
// // the tables that use them
// async function makeMedia(){
//   await makeTextTable();
//   await makeTextimageTable();
//   await makeAudiofileTable();
//   await makeElicitationfileTable();
// }

async function makeTables() {
  // await setSessionVariables()
  // await makeUsersTable();
  // await makeActiveTable();
  // await makeAffixTypesTable();
  // await makeStemTable();
  //await makeStemCategoriesTable();
  // await makeRoleTable();
  // await makeUserRolesTable();
  // await makeRootTable();
  // await makeAffixTable();
  // await makeBibliographyTable();
  // await makeSpellingTable();
  // await makeConsonantTable();
  // await makeVowelTable();
  // await makeAudioSetMetaDataTable();
  // await makeAudiosetTable();
  // await makeTextFileMetaDataTable();
  // await makeMedia();
}

// // below call the build function(s) you want.
//makeTables()
//makeAudiosetTable()
//makeAudiofileTable()

//fake table for versioning

// var Puppy = sequelize.define('puppy', {
//   size: { type: Sequelize.TEXT },
//   color: { type: Sequelize.TEXT },
// },
// {
//   charset: 'utf8mb4',
//   collate: 'utf8mb4_unicode_ci'
// });

// async function makePuppyTable(){
//   // force: true will drop the table if it already exists
//   await Puppy.sync({force: true})
//   const res = await sequelize.query(`SELECT audit.audit_table('puppies')`, { type: QueryTypes.SELECT });
//   //Temporal(Puppy, sequelize)
//   //const PersonVersion = new Version(Person);
//   let puppy = await Puppy.build({size: 'enormous', color: 'black'}).save();
//   puppy.size = 'smaller';
//   await puppy.save()
//   await puppy.destroy()
//   //const versions = await PuppyVersion.findAll({where : {id: puppy.id}});
//   //const versionsByInstance = await puppy.getVersions();
//   //const versionsByModel = await Puppy.getVersions({where : {id: puppy.id}});
//   //console.log(JSON.parse(JSON.stringify(versions)));
// }

//makePuppyTable()
makeTables();
