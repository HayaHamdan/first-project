 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import City from 'App/Models/City';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CitiesController {

    public async getAll(ctx: HttpContextContract) {
        var result = await City.query().preload("country");
        var object = await ctx.auth.authenticate();
        console.log(object);
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await City.query().preload("country").where("id",id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            city: schema.string(),
            country_id: schema.number(),});
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var city=new City();
        city.city=fields.city;
        city.countryId=fields.country_id;
         var result= await city.save();
         return result;   
       
    }


    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            city: schema.string(),
            country_id : schema.number(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var city = await City.findOrFail(id);
        city.city=fields.city;
        city.countryId=fields.country_id;
         var result= await city.save();
         return result;   
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var city = await City.findOrFail(id);
        await city.delete();
        return { message: "The city has been deleted!" };

    }
}
