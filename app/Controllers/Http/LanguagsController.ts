import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Languag from 'App/Models/Languag';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class LanguagsController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result= await Languag.all();
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Languag.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
           name: schema.string(),
           });
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var languag=new Languag();
        languag.name=fields.name;
        
         var result= await languag.save();
         return result;   
       
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
           name: schema.string(),
            
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var languag = await Languag.findOrFail(id);
       languag.name=fields.name;
        var result = await languag.save();
        return result;
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var languag = await Languag.findOrFail(id);
        await languag.delete();
        return { message: "The languag has been deleted!" };

    }
}
