import HttpStatus from 'http-status-codes';
import * as todoService from '../services/todoService';

export function fetchById(req, res, next) {
  todoService
    .getById(req.authData.userid)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
}

export function fetchAll(req, res, next) {
  todoService
    .getAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
}

export function fetchCompletedById(req, res, next) {
  todoService
    .getFinishedById(req.authData.userid)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
}

export function fetchUnfinishById(req, res, next) {
  todoService
    .getUnfinishedById(req.authData.userid)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
}

export function create(req, res, next) {
  todoService
    .createTodo(req.authData.userid, req.body)
    .then(data => {
      res.status(HttpStatus.CREATED).json(data);
    })
    .catch(err => {
      next(err);
    });
}

export function deleteTodo(req, res, next) {
  todoService
    .deleteTodo(req.authData.userid, req.params.id)
    .then(data => {
      res.status(HttpStatus.NO_CONTENT).json(data);
    })
    .catch(err => res.status(HttpStatus.NOT_FOUND).json(err));
}

export function update(req, res, next) {
  todoService
    .updateTodo(req.authData.userid, req.params.id, req.body.completed)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
}
