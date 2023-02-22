
import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

    
    Route.group(()=>{
        Route.get("/","ActorsController.getAll");
        Route.get("/:id","ActorsController.getById");
        Route.post("/","ActorsController.create");
        Route.put("/:id","ActorsController.update");
        Route.delete("/:id","ActorsController.delete");
    }).prefix("/actors");

    Route.group(()=>{
        Route.get("/","CategoriesController.getAll");
        Route.get("/:id","CategoriesController.getById");
        Route.post("/","CategoriesController.create");
        Route.put("/","CategoriesController.update");
        Route.delete("/:id","CategoriesController.delete");
    }).prefix("/categories");

    Route.group(()=>{
        Route.get("/","CountriesController.getAll");
        Route.get("/:id","CountriesController.getById");
        Route.post("/","CountriesController.create");
        Route.put("/","CountriesController.update");
        Route.delete("/:id","CountriesController.delete");
    }).prefix("/countries");

    Route.group(()=>{
        Route.get("/","StoresController.getAll");
        Route.get("/:id","StoresController.getById");
        Route.post("/","StoresController.create");
        Route.put("/","StoresController.update");
        Route.delete("/:id","StoresController.delete");
    }).prefix("/stores");

    Route.group(()=>{
        Route.get("/","AdressesController.getAll");
        Route.get("/:id","AdressesController.getById");
        Route.post("/","AdressesController.create");
        Route.put("/","AdressesController.update");
        Route.delete("/:id","AdressesController.delete");
    }).prefix("/address");


    Route.group(()=>{
        Route.get("/","CitiesController.getAll");
        Route.get("/:id","CitiesController.getById");
        Route.post("/","CitiesController.create");
        Route.put("/","CitiesController.update");
        Route.delete("/:id","CitiesController.delete");
    }).prefix("/cities");


    Route.group(()=>{
        Route.get("/","CustomersController.getAll");
        Route.get("/:id","CustomersController.getById");
        Route.post("/","CustomersController.create");
        Route.put("/","CustomersController.update");
        Route.delete("/:id","CustomersController.delete");
    }).prefix("/customers");


    Route.group(()=>{
        Route.get("/","FilmActorsController.getAll");
        Route.get("/:id","FilmActorsController.getById");
        Route.post("/","FilmActorsController.create");
        Route.put("/","FilmActorsController.update");
        Route.delete("/:id","FilmActorsController.delete");
    }).prefix("/film_actors");

    Route.group(()=>{
        Route.get("/","FilmTextsController.getAll");
        Route.get("/:id","FilmTextsController.getById");
        Route.post("/","FilmTextsController.create");
        Route.put("/","FilmTextsController.update");
        Route.delete("/:id","FilmTextsController.delete");
    }).prefix("/film_text");

    Route.group(()=>{
        Route.get("/","FilmsController.getAll");
        Route.get("/:id","FilmsController.getById");
        Route.post("/","FilmsController.create");
        Route.put("/","FilmsController.update");
        Route.delete("/:id","FilmsController.delete");
    }).prefix("/films");

    Route.group(()=>{
        Route.get("/","InventoriesController.getAll");
        Route.get("/:id","InventoriesController.getById");
        Route.post("/","InventoriesController.create");
        Route.put("/","InventoriesController.update");
        Route.delete("/:id","InventoriesController.delete");
    }).prefix("/inventories");

    Route.group(()=>{
        Route.get("/","LanguagsController.getAll");
        Route.get("/:id","LanguagsController.getById");
        Route.post("/","LanguagsController.create");
        Route.put("/","LanguagsController.update");
        Route.delete("/:id","LanguagsController.delete");
    }).prefix("/languages");

    Route.group(()=>{
        Route.get("/","StaffController.getAll");
        Route.get("/:id","StaffController.getById");
        Route.post("/","StaffController.create");
        Route.put("/","StaffController.update");
        Route.delete("/:id","StaffController.delete");
    }).prefix("/staffs");

    Route.group(() => {
        Route.post("/login", "UsersController.login");
        Route.post("/logout", "UsersController.logout");
        Route.post("/", "UsersController.create");
      }).prefix("/users");
});














