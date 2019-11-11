import { runInNewContext } from "vm";
import { addNewRecipe, getAllRecipes, getRecipeWithID, updateRecipe, deleteRecipe } from '../controllers/recipeController';

const routes = (app) => {
    app.route('/recipe')

    //GET Endpoint
    .get((req, res, next) =>{
        //middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    },getAllRecipes)
    
    //POST Endpoint
    .post((req, res, next) =>{
        //middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    },addNewRecipe);

    //PUT Endpoint
    app.route('/recipe/:recipeId')
    .put((req, res, next) =>{
        //middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    },updateRecipe)


    //DELETE Endpoint
    .delete((req, res, next) =>{
        //middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    },deleteRecipe)

    //GET Endpoint, for specific Recipe
    .get((req, res, next) =>{
        //middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getRecipeWithID);

}

//export or else you won't be able to use above anywhere else. Then go to index.js and add:
//import routes from './src/routes/recipeRoutes';
export default routes;