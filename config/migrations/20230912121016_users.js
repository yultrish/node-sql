/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employees', (table)=>{
        table.increments('id').primary();
        table.string('name')
        table.string('email')
        table.string('job_table')
        table.timestamps(true, true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('employees')
  
};
