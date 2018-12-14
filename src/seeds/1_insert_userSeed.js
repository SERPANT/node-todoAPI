/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('user')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('user').insert([
          {
            username: 'Shreejit',
            password: 'hello',
            updated_at: new Date()
          },
          {
            username: 'Aman',
            password: 'hello',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
