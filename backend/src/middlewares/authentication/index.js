const jwt = require('jsonwebtoken');
require('dotenv').config();

const { checkIfExists } = require('../../utils/databaseValidation');


const { User } = require('../../database/models');

// eslint-disable-next-line consistent-return
function checkToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Token must have 2 parts' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Invalid token' });
    req.userId = decoded.id;
    return next();
  });
}

function checkId(req, res, next) {
  const { userId } = req.params;
  
  if (parseInt(userId, 10) !== parseInt(req.userId, 10)) return res.status(401).send({ error: 'Token does not belong to this user' });
  
  const user = User.findByPk(userId);

  if(!checkIfExists(user)) return res.status(404).send({ error: 'user not found' });

  return next();
}

module.exports = {
  checkToken,
  checkId
};
