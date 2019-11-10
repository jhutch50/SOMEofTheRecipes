import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RecipeSchema = new Schema({
    swagger: "2.0",
    title: "Music API Documentation",
    title: {
        type: String,
        required: 'Enter recipe title'
    },
    username: {
        type: String,
        required: 'Enter username'
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: Number
    },
    description: {
        type: String
    },
    ingredients: [{
            type: String
        }],
    steps: [{
            type: String
        }],
    imageURL: {
        type: String
    }
});