/**
 * Delete all existing entries and seed users table.
 *
 * @param  {Object} knex
 * @return {Promise}
 */
export function seed(knex) {
  return knex('todo')
    .del()
    .then(() => {
      return knex('todo').insert([
        {
          userid: 28,
          discription: 'complete this todo list',
          updated_at: new Date(),
          completed: true
        },
        {
          userid: 29,
          discription: 'don not eat all the food',
          updated_at: new Date(),
          completed: false
        },
        {
          userid: 28,
          discription: 'complete all the task assigned',
          updated_at: new Date(),
          completed: true
        },
        {
          userid: 29,
          discription: 'learn machine learning',
          updated_at: new Date(),
          completed: false
        }
      ]);
    });
}
