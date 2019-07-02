const jwt = require('jsonwebtoken');
const { AuthorizationError, noInputError } = require('./../errors/error');

function checkToken(context) {
  const token = context.headers.token;
  if (!token) {
    throw new AuthorizationError({
      message: `You must supply a JWT for authorization!`
    });
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

module.exports = {
  authenticateUser_R,
  checkUserExists_R,
  loginUser_R,
  addUser_R,
  updateUser_R,
  updateUserAdmin_R,
  addAffix_R,
  addRoot_R,
  addStem_R,
  deleteAffix_R,
  deleteRoot_R,
  deleteStem_R,
  affix_R,
  affixes_R,
  root_R,
  roots_R,
  stem_R,
  stems_R,
  updateAffix_R,
  updateRoot_R,
  updateStem_R
};
