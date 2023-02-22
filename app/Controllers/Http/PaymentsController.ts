 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Payment from 'App/Models/Payment';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PaymentsController {
    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result= await Payment.query().preload("staff").preload("customer").preload("rental");
        return result;
    }

    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Payment.findOrFail(id);
        return result;
    }

    public async create(ctx: HttpContextContract) {
         
        const newSchema = schema.create({
            customer_id: schema.number(),
            staff_id: schema.number(),
            rental_id: schema.number(),
            amount: schema.string(),
            payment_date: schema.date(),
        });
            
            const fields = await ctx.request.validate({ schema: newSchema })
        var payment=new Payment();
        payment.customerId=fields.customer_id;
        payment.staffId=fields.staff_id;
        payment.rentalId=fields.rental_id;
        payment.amount=fields.amount;
        payment.paymentDate=fields.payment_date;

         var result= await payment.save();
         return result;   
       
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            customer_id: schema.number(),
            staff_id: schema.number(),
            rental_id: schema.number(),
            amount: schema.string(),
            payment_date: schema.date(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var payment = await Payment.findOrFail(id);
        payment.customerId=fields.customer_id;
        payment.staffId=fields.staff_id;
        payment.rentalId=fields.rental_id;
        payment.amount=fields.amount;
        payment.paymentDate=fields.payment_date;

         var result= await payment.save();
         return result;   
        
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var payment = await Payment.findOrFail(id);
        await payment.delete();
        return { message: "The payment has been deleted!" };

    }

}
