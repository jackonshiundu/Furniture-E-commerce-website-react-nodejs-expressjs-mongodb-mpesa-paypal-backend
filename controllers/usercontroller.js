const User = require('../models/usermodel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const createError = require('../middlewares/error');
const secret = 'furniture';

//registering the user
const signup = async (req, res, next) => {
  const { firstName, lastName, password, email, phone } = req.body;

  try {
    if (!firstName && !lastName && !password && !email && !phone) {
      return next(createError(404, 'Please Fill in all the credentials'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(404, 'Email already exixts'));
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const name = `${firstName} ${lastName}`;

    const results = await User.create({
      name: name,
      password: hashedPassword,
      email,
    });

    const token = jwt.sign(
      {
        email: results.email,
        id: results._id,
        role: results.role,
      },
      secret,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: results, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//signing in the users
const signin = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    if (!password && !email) {
      return next(createError(404, 'Please Fill in all the credentials'));
    }
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
      return next(createError(404, 'No user With such an Email'));
    }

    const decryptedPassword = await bcryptjs.compare(
      password,
      oldUser.password
    );
    if (!decryptedPassword) {
      return next(createError(404, 'Password Dont,t Match'));
    }
    const token = jwt.sign(
      {
        email: oldUser.email,
        id: oldUser._id,
        role: oldUser.role,
      },
      secret,
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    next(error);
  }
};
//getting a single user user
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const getUserall = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user) {
      return next(createError(404, 'No User In the Database'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, `No User exists with the id:${id}`));
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted Succesfully' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updateAccount = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, county, city, lastName, password, email, phone } =
    req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, `No User exists with the id:${id}`));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const updatedDetails = {
      email,
      name: `${firstName} ${lastName}`,
      county,
      city,
      password: hashedPassword,
      phoneNumber: phone,
      _id: id,
    };
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: updatedDetails,
      },
      { new: true }
    );
    const token = jwt.sign(
      {
        email: updatedUser.email,
        id: updatedUser._id,
        role: updatedUser.role,
      },
      secret,
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: updatedUser, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = {
  signin,
  updateAccount,
  deleteUser,
  signup,
  getUser,
  getUserall,
};
