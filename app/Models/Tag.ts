import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany, } from '@ioc:Adonis/Lucid/Orm'
import Paste from './Paste'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Paste)
  public pastes: ManyToMany<typeof Paste>
}
