/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tokenTable', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table
      .integer('userid')
      .unsigned()
      .references('id')
      .inTable('user')
      .notNull()
      .onDelete('cascade');
    table.string('ref_Token');
    table.string('exp_Time');
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tokenTable');
}
