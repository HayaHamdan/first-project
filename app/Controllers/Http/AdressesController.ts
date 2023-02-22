import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AdressesController {

    public async getAll(ctx: HttpContextContract) {
       
        var result = await Address.query().preload("city");
        var object = await ctx.auth.authenticate();
        console.log(object);
        
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Address.query().preload("city").where("id",id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            address: schema.string(),
            address2: schema.string(),
            district: schema.string(),
            postal_code: schema.string(),
            phone: schema.string(),
            location: schema.string(),
            city_id: schema.number(),

        });
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var address=new Address();
        address.address=fields.address;
        address.address2=fields.address2;
        address.district=fields.district;
        address.postalCode=fields.postal_code;
        address.phone=fields.phone;
        address.location=fields.location;
        address.cityId =fields.city_id;

         var result= await address.save();
         return result;   
       
    }


    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            address: schema.string(),
            address2: schema.string(),
            district: schema.string(),
            postal_code: schema.string(),
            phone: schema.string(),
            location: schema.string(),
            city_id: schema.number(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var address = await Address.findOrFail(id);
        address.address=fields.address;
        address.address2=fields.address2;
        address.district=fields.district;
        address.postalCode=fields.postal_code;
        address.phone=fields.phone;
        address.location=fields.location;
        address.cityId =fields.city_id;
        var result = await address.save();
        return result;
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var address = await Address.findOrFail(id);
        await address.delete();
        return { message: "The address has been deleted!" };

    }

}
