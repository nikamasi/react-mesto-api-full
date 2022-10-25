const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const { urlRegex } = require('./utils/regex');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(express.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required().min(3),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
}), login);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Invalid URL or request method.'));
});

app.use(cors);

app.use(errorLogger);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Server error' : err.message;
  res.status(statusCode).send({ message });
});

app.listen(PORT);
