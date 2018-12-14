import Boom from 'boom';

import User from '../models/user';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(userid) {
  return User.where({ id: userid })
    .fetch()
    .then(user => {
      if (!user) {
        throw Boom.notFound('User not found');
      }

      return user;
    });
}

export function checkUser(username, password) {
  return User.where({ username, password })
    .fetch()
    .then(user => {
      if (!user) {
        throw Boom.notFound('User not found');
      }

      return user;
    });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(userid, username, password) {
  return new User({ id: userid, password, username }).save();
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name });
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
