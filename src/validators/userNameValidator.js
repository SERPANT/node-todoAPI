import Joi from 'joi';

import validate from '../utils/validate';
import * as userService from '../services/userService';

const SCHEMA = {
  username: Joi.string()
    .label('username')
    .max(20)
    .required(),
  password: Joi.string()
    .label('password')
    .max(20)
    .required()
};

export function userNameValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => {
      err.message = 'user and password validation failed';
      res.status(401).json({ err });
    });
}

export function findUserName(req, res, next) {
  let user = userService
    .checkUser(req.body.username, req.body.password)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      res.status(404).json(err);
    });

  // res.json({ user: user.username });
}
