import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Languag extends BaseModel {

  public static table="languages";
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"name"})
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
