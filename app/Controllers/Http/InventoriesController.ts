 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Inventory from 'App/Models/Inventory';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class InventoriesController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result= await Inventory.query().preload("staff").preload("film");
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Inventory.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            film_id : schema.number(),
           store_id: schema.number(),});
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var inventory=new Inventory();
        inventory.filmId=fields.film_id;
        inventory.storeId=fields.store_id;
         var result= await inventory.save();
         return result;   
       
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            film_id : schema.number(),
           store_id: schema.number(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var inventory = await Inventory.findOrFail(id);
        inventory.filmId=fields.film_id;
        inventory.storeId=fields.store_id;
         var result= await inventory.save();
         return result;   
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var inventory = await Inventory.findOrFail(id);
        await inventory.delete();
        return { message: "The inventory has been deleted!" };

    }

}
