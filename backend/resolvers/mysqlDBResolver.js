const jwt = require('jsonwebtoken');
const { AuthorizationError, noInputError } = require('./../errors/error');

function checkToken(context) {
  const token = context.headers.token;
  if (!token) {
    throw new AuthorizationError({
      message: `You must supply a JWT for authorization!`
    });
  } else if (token == null) {
    throw new AuthorizationError({
      message: `Username or Password is invalid`
    })
  }
  const decoded = jwt.verify(
    token.replace('Bearer ', ''),
    process.env.JWT_SECRET
  );
  return decoded;
}

const authenticateUser_R = (context, connectorQuery) => {
  return connectorQuery.apply(this, [checkToken(context)]);
};

const checkUserExists_R = (input, connectorQuery) => {
  if(!input) {
    throw new noInputError({
      message: `You must supply a valid Input!`
    });
  }
  return connectorQuery.apply(this, [input]);
};

const loginUser_R = (input, connectorQuery) => {
  if(!input) {
    throw new noInputError({
      message: `You must supply a valid Input!`
  });
}
  return connectorQuery.apply(this, [input]);
};

const addUser_R = (input, connectorQuery) => {
  if(!input) {
    throw new noInputError({
      message: `You must supply a valid Input!`
  });
}
  return connectorQuery.apply(this, [input]);
};

const updateUser_R = (context,input,connectorQuery) => {
  input["myid"] = checkToken(context).id;
  return connectorQuery.apply(this, [input]);
};

const getUserFromToken_R = (context,input,connectorQuery) => {
  input["myid"] = checkToken(context).id;
  return connectorQuery.apply(this, [input]);
};

const updateUserAdmin_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}

const addNewUser_R = (context, input, connectorQuery) => {
  console.log(input);
};

const addAffix_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const addBibliography_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const addRoot_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const addStem_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const deleteAffix_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const deleteBibliography_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const deleteRoot_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const deleteStem_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const updateAffix_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const updateBibliography_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const updateRoot_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const updateStem_R = ( context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}

const affix_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}

const affixes_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}

const bibliography_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}

const bibliographies_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}

const root_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}

const roots_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}

const stem_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}

const stems_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}

const users_R = ( context, input, expectedRoles, connectorQuery ) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this,[input]);
}
const spellings_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const consonants_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const vowels_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const text_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const texts_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const textfile_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const textfiles_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const textimage_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const textimages_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const audiofile_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const audiofiles_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const audioset_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const audiosets_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const audiorelation_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const audiorelations_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const elicitationfile_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const elicitationfiles_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const elicitationset_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const elicitationsets_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const elicitationrelation_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
const elicitationrelations_R = ( input, connectorQuery) => {
  return connectorQuery.apply(this,[input]);
}
module.exports = {
  authenticateUser_R,
  checkUserExists_R,
  loginUser_R,
  addUser_R,
  updateUser_R,
  updateUserAdmin_R,
  getUserFromToken_R,
  addAffix_R,
  addBibliography_R,
  addRoot_R,
  addStem_R,
  deleteAffix_R,
  deleteBibliography_R,
  deleteRoot_R,
  deleteStem_R,
  affix_R,
  affixes_R,
  bibliography_R,
  bibliographies_R,
  root_R,
  roots_R,
  stem_R,
  stems_R,
  updateAffix_R,
  updateBibliography_R,
  updateRoot_R,
  updateStem_R,
  users_R,
  spellings_R,
  consonants_R,
  vowels_R,
  text_R,
  texts_R,
  textfile_R,
  textfiles_R,
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
};
