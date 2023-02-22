import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Country from 'App/Models/Country';


export default class CountriesController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result= await Country.all();
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Country.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {

        const newSchema = schema.create({
            country: schema.string(),
        });
            const fields = await ctx.request.validate({ schema: newSchema })

        
        var country=new Country();
        country.country=fields.country;
         var result= await country.save();
         return result;   
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            country: schema.string(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

        
        var id = fields.id;
        var country = await Country.findOrFail(id);
        country.country=fields.country;
        var result = await country.save();
        return result;
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;

        var country = await Country.findOrFail(id);
        await country.delete();
        return { message: "The country has been deleted!" };
    }
}
