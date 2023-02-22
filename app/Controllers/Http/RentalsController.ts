 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Rental from 'App/Models/Rental';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RentalsController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result= await Rental.query().preload("staff").preload("inventory").preload("customer");
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Rental.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            rental_date: schema.date(),
            inventory_id: schema.number(),
            customer_id: schema.number(),
            return_date: schema.date(),
            staff_id: schema.number(),
        
        });
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var rental=new Rental();
        rental.rentalDate=fields.rental_date;
        rental.inventoryId=fields.inventory_id;
        rental.customerId=fields.customer_id;
        rental.returnDate=fields.return_date;
        rental.staffId=fields.staff_id;
         var result= await rental.save();
         return result;   
       
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            rental_date: schema.date(),
            inventory_id: schema.number(),
            customer_id: schema.number(),
            return_date: schema.date(),
            staff_id: schema.number(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var rental = await Rental.findOrFail(id);
        rental.rentalDate=fields.rental_date;
        rental.inventoryId=fields.inventory_id;
        rental.customerId=fields.customer_id;
        rental.returnDate=fields.return_date;
        rental.staffId=fields.staff_id;
         var result= await rental.save();
         return result;   
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var rental = await Rental.findOrFail(id);
        await rental.delete();
        return { message: "The rental has been deleted!" };

    }
}
