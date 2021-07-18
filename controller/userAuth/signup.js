const { User } = require('../../models');
const { CustomError, hash } = require('../../helper');
const { createOne, findOne } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      throw new CustomError('Password And Confirm Password are not same', 400);
    }

    const findQuery = {
      email,
    };

    const isUserExist = await findOne(User, findQuery);

    if (isUserExist) {
      throw new CustomError('Email Id already registered.', 404);
    }

    const hashedKey = hash(password);

    const createQuery = {
      fullName,
      email,
      password: hashedKey,
    };

    const newUser = await createOne(User, createQuery);

    if (!newUser) {
      throw new CustomError('Request can not be processed by server.', 500);
    }

    return res.status(200).send({
      data: {
        message: 'user registered successfully',
      },
    });
  } catch (err) {
    return res.status(err.code).send({ errors: [{ message: err.message }] });
  }
};
