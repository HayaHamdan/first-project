 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Customer from 'App/Models/Customer';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CustomersController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result = await Customer.query().preload("staff").preload("address");
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Customer.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            store_id: schema.number(),
            first_name: schema.string(),
            last_name: schema.string(),
            email: schema.string(),
            address_id: schema.number(),
            active: schema.boolean(),
        
        });
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var customer=new Customer();
        customer.storeId=fields.store_id;
        customer.firstName=fields.first_name;
       customer.lastName=fields.last_name;
       customer.email=fields.email;
       customer.addressId=fields.address_id;
       customer.active=fields.active;
         var result= await customer.save();
         return result;   
       
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            store_id: schema.number(),
            first_name: schema.string(),
            last_name: schema.string(),
            email: schema.string(),
            address_id: schema.number(),
            active: schema.boolean(),
        
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var customer = await Customer.findOrFail(id);
        customer.storeId=fields.store_id;
        customer.firstName=fields.first_name;
       customer.lastName=fields.last_name;
       customer.email=fields.email;
       customer.addressId=fields.address_id;
       customer.active=fields.active;
         var result= await customer.save();
         return result;   
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var customer = await Customer.findOrFail(id);
        await customer.delete();
        return { message: "The customer has been deleted!" };

    }



}
