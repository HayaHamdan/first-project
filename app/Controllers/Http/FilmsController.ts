 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Film from 'App/Models/Film';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
//import Languag from 'App/Models/Languag';

export default class FilmsController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result = await Film.query().preload("language").preload("originallanguage");
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Film.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            title: schema.string(),
            description: schema.string(),
            language_id: schema.number(),
            release_year: schema.string(),
            original_language_id: schema.number(),
            rental_duration: schema.date(),
            rental_rate: schema.number(),
            length: schema.number(),
            replacement_cost: schema.number(),
            rating: schema.number(),
            special_features: schema.number(),
        });
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var film=new Film();
       film.title=fields.title;
        film.description=fields.description;
        film.languageId=fields.language_id;
        film.releaseYear=fields.release_year;
        film.originalLanguageId=fields.original_language_id;
        film.rentalRate=fields.rental_rate;
        film.length=fields.length;
        film.replacementCost=fields.replacement_cost;
        film.rating=fields.rating;
        film.ratspecialFeaturesing=fields.special_features;

         var result= await film.save();
         return result;   
       
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            title: schema.string(),
            description: schema.string(),
            language_id: schema.number(),
            release_year: schema.string(),
            original_language_id: schema.number(),
            rental_duration: schema.date(),
            rental_rate: schema.number(),
            length: schema.number(),
            replacement_cost: schema.number(),
            rating: schema.number(),
            special_features: schema.number(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var film = await Film.findOrFail(id);
        film.title=fields.title;
        film.description=fields.description;
        film.languageId=fields.language_id;
        film.releaseYear=fields.release_year;
        film.originalLanguageId=fields.original_language_id;
        film.rentalRate=fields.rental_rate;
        film.length=fields.length;
        film.replacementCost=fields.replacement_cost;
        film.rating=fields.rating;
        film.ratspecialFeaturesing=fields.special_features;

         var result= await film.save();
         return result;   
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var film = await Film.findOrFail(id);
        await film.delete();
        return { message: "The film has been deleted!" };

    }

   
}
