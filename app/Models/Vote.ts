import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Paste from './Paste'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Foreign key is still on the same model
  @column()
  public pasteId: number

  @belongsTo(() => Paste)
  public paste: BelongsTo<typeof Paste>
}
