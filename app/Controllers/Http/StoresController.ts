 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Database from '@ioc:Adonis/Lucid/Database'
 import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Store from 'App/Models/Store';

export default class StoresController {

    public async getAll(ctx: HttpContextContract) {
        var object = await ctx.auth.authenticate();
        console.log(object);
        var result = await Store.query().preload("managerStaff").preload("address");
        return result;
    }
    public async getById(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var result = await Store.query().preload("managerStaff").where("id",id);
        return result;
    }

    public async create(ctx: HttpContextContract) {

        const newSchema = schema.create({
            manager_staff_id: schema.number(),
            address_id: schema.number(),});
            const fields = await ctx.request.validate({ schema: newSchema })

        
        var store=new Store();
        store.managerStaffId=fields.manager_staff_id;
        store.addressId=fields.address_id;
         var result= await store.save();
         return result;   
    }

    public async update(ctx: HttpContextContract) {

        const newSchema = schema.create({
            manager_staff_id: schema.number(),
            address_id: schema.number(),
            id: schema.number(),
        });
        const fields = await ctx.request.validate({ schema: newSchema })

       
        var id = fields.id;
        var store = await Store.findOrFail(id);
        store.managerStaffId=fields.manager_staff_id;
        store.addressId=fields.address_id;
        var result = await store.save();
        return result;
    }

    public async delete(ctx: HttpContextContract) {
        var id = ctx.params.id;
        var store = await Store.findOrFail(id);
        await store.delete();
        return { message: "The story has been deleted!" };

}}



