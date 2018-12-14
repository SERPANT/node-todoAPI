import Joi from 'joi';

import validate from '../utils/validate';

const SCHEMA = {
  discription: Joi.string()
    .label('discription')
    .max(60)
    .required()
};

export function createTodoValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => {
      err.message = 'Todo discription missing, creation failed failed';
      res.status(401).json({ err });
    });
}
