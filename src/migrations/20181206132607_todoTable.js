/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('todo', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();

    //foreign key
    table
      .integer('userid')
      .unsigned()
      .references('id')
      .inTable('user')
      .notNull()
      .onDelete('cascade');
    table.string('discription').notNull();
    table.boolean('completed').notNull();
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('todo');
}
