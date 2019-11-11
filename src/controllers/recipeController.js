import mongoose from 'mongoose';
import { RecipeSchema } from '../models/recipeModel';

const Recipe = mongoose.model('Recipe', RecipeSchema);

export const addNewRecipe = (req, res) => {
    //pulls information from the body
    let newRecipe = new Recipe(req.body);


    //Saving images as numbers representing the image
    newRecipe.img.data = fs.readFileSync(req.files.userPhoto.path);
    newRecipe.img.contentType = 'image/png';

    //saves the recipe in the database
    newRecipe.save((err, recipe) => {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
    });
};

export const getAllRecipes = (req, res) => {
    Recipe.find({}, (err, recipe) => {
        if(err){    
            res.send(err);
        }
        res.json(recipe);
    });
};

export const getRecipeWithID = (req, res) => {
    Recipe.findById(req.params.recipeId, (err, recipe) => {
        if(err){    
            res.send(err);
        }
        res.json(recipe);
    });
};

export const updateRecipe = (req, res) => {
    //new: true gets data with the update
    Recipe.findOneAndUpdate({ _id: req.params.recipeId}, req.body, {new: true}, (err, recipe) => {
        if(err){    
            res.send(err);
        }
        res.json(recipe);
    });
};

export const deleteRecipe = (req, res) => {
    Recipe.deleteOne({_id: req.params.recipeId }, (err, recipe) => {
        if(err){    
            res.send(err);
        }
        res.json({ message: 'Successfully deleted recipe'});
    });
};