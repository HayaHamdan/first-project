 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Staff from 'App/Models/Staff';
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class StaffController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);

        var result= await Staff.query().preload("addressid").preload("store");
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Staff.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            first_name: schema.string(),
            last_name: schema.string(),
            address_id: schema.number(),
            email: schema.string(),
            store_id: schema.number(),
            active: schema.boolean(),
            username: schema.string(),
            password: schema.string(),
        
        
        });
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var staff=new Staff();
        staff.firstName=fields.first_name;
        staff.lastName=fields.last_name;
        staff.addressId=fields.address_id;
        staff.email=fields.email;
        staff.storeId=fields.store_id;
        staff.active=fields.active;
        staff.username=fields.username;
        staff.password=fields.password;
         var result= await staff.save();
         return result;   
       
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            first_name: schema.string(),
            last_name: schema.string(),
            address_id: schema.number(),
            email: schema.string(),
            store_id: schema.number(),
            active: schema.boolean(),
            username: schema.string(),
            password: schema.string(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var staff = await Staff.findOrFail(id);
        staff.firstName=fields.first_name;
        staff.lastName=fields.last_name;
        staff.addressId=fields.address_id;
        staff.email=fields.email;
        staff.storeId=fields.store_id;
        staff.active=fields.active;
        staff.username=fields.username;
        staff.password=fields.password;
         var result= await staff.save();
         return result;   
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var staff = await Staff.findOrFail(id);
        await staff.delete();
        return { message: "The staff has been deleted!" };

    }
}
