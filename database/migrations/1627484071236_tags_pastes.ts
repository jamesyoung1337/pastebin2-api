import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TagsPastes extends BaseSchema {
  protected tableName = 'tags_pastes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tag_id').unsigned().references('tags.id')
      table.integer('paste_id').unsigned().references('pastes.id')
      table.unique(['tag_id', 'paste_id'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
