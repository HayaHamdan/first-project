import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Actor from './Actor'
import Film from './Film'

export default class FilmActor extends BaseModel {
  public static table="film_actors"
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs:"actor_id"})
  public actorId: number

  @column({serializeAs:"film_id"})
  public filmId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @manyToMany(() => Actor, {
    foreignKey:'actorId'
  })
  public actor: ManyToMany<typeof Actor>

  @manyToMany(() => Film, {
    foreignKey:'filmId';
  })
  public film: ManyToMany<typeof Film>
}
