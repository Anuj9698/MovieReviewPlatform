const bcrypt = require('bcrypt');

module.exports = {
  hash: (password, saltRounds = 10) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  compare: (password, hash) => {
    const isvalid = bcrypt.compareSync(password, hash);
    return isvalid;
  },
};
