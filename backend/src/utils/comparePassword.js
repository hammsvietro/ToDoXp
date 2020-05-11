const bcrypt = require('bcryptjs');

const comparePassword = (userPassword, providedPassword) => {
  return bcrypt.compare(userPassword, providedPassword); 
};

module.exports = comparePassword;
