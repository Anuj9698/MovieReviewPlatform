const { User } = require('../../models');
const { CustomError, compare, generateToken } = require('../../helper');
const { findOne } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findQuery = {
      email,
      activated: 1,
    };

    const isUserExist = await findOne(User, findQuery);

    if (!isUserExist) {
      throw new CustomError('Invalid credentials', 403);
    }

    const isValid = compare(password, isUserExist.password);

    if (!isValid) {
      throw new CustomError('Invalid credentials', 403);
    }

    const token = generateToken({
      userId: isUserExist.id,
    });

    return res.status(200).send({
      data: {
        token: token,
        message: 'Login successfully',
      },
    });
  } catch (err) {
    return res
      .status(err.code || 500)
      .send({ errors: [{ message: err.message }] });
  }
};
