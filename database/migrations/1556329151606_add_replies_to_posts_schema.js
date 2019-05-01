'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddRepliesToPostsSchema extends Schema {
  up() {
    this.table('posts', (table) => {
      // alter table
      table.integer('parent_id').unsigned().index()
    })
  }

  down() {
    this.table('posts', (table) => {
      // reverse alternations
      table.dropColumn('parent_id')
    })
  }
}

module.exports = AddRepliesToPostsSchema
