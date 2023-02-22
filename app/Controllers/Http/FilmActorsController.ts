 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import FilmActor from 'App/Models/FilmActor';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class FilmActorsController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result= await FilmActor.all();
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await FilmActor.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            actor_id : schema.number(),
            film_id: schema.number(),
        });
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var filmactor=new FilmActor();
        filmactor.actorId=fields.actor_id;
       filmactor.filmId=fields.film_id;
         var result= await filmactor.save();
         return result;   
       
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            actor_id : schema.number(),
            film_id: schema.number(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var filmactor = await FilmActor.findOrFail(id);
        filmactor.actorId=fields.actor_id;
        filmactor.filmId=fields.film_id;
          var result= await filmactor.save();
          return result;
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var filmactor = await FilmActor.findOrFail(id);
        await filmactor.delete();
        return { message: "The filmactor has been deleted!" };

    }


}
