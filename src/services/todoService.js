import Boom from 'boom';
import Todo from '../models/todo';
import { userInfo } from 'os';

export function getAll() {
  return Todo.fetchAll();
}

export function getById(userId) {
  return Todo.where({ userid: userId })
    .fetchAll()
    .then(data => {
      if (data === null || data === undefined || data.length <= 0) {
        throw Boom.notFound('Todo not found');
      }

      return data;
    });
}

export function getFinishedById(userId) {
  return Todo.where({ completed: true, userid: userId })
    .fetchAll()
    .then(data => {
      if (data === null || data === undefined || data.length <= 0) {
        throw Boom.notFound('no Todo found');
      }

      return data;
    });
}

export function getUnfinishedById(userId) {
  return Todo.where({ completed: false, userid: userId })
    .fetchAll()
    .then(data => {
      if (data === null || data === undefined || data.length <= 0) {
        throw Boom.notFound('no Todo found');
      }

      return data;
    });
}

export function createTodo(userId, todo) {
  return new Todo({
    userid: userId,
    discription: todo.discription,
    completed: false
  }).save();
}

export function deleteTodo(userId, todoId) {
  return Todo.where({ userid: userId, id: todoId })
    .fetch()
    .then(todo => {
      if (todo === null || todo === undefined) {
        throw Boom.notFound('Todo not found');
      }

      todo.destroy();
    })
    .catch(err => {
      err.message = 'failed to delete';
      return err;
    });
}

export async function updateTodo(userId, todoId, completed) {
  if (completed) {
    return new Todo({ userid: userId, id: todoId }).save({ completed: JSON.parse(completed) });
  } else {
    return new Todo({ userid: userId, id: todoId }).save({ completed: true });
  }
}
