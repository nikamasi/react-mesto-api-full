const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId).orFail(() => next(new NotFoundError('A user with this id does not exist')))
    .then((user) => res.send(user))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Invalid id'));
      } else {
        next(e);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  req.params.userId = req.user._id;
  getUserById(req, res, next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((data) => {
          // eslint-disable-next-line no-underscore-dangle, no-shadow
          const { password, ...otherData } = data._doc;
          res.status(StatusCodes.CREATED).send(otherData);
        })
        .catch((e) => {
          if (e.name === 'ValidationError') {
            next(new BadRequestError(e.message));
          } else if (e.code === 11000) {
            next(new ConflictError('A user with this email already exists.'));
          } else {
            next(e);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User not found'));
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(e.message));
      } else {
        next(e);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((data) => {
      if (!data) {
        next(new NotFoundError('User not found'));
      }
      return res.send({ data });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  updateUser,
  updateAvatar,
  getCurrentUser,
};
