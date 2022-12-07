const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    DateCreated : {
        type : Date,
        immutable : true,
        default : () => Date.now(),
    },
    RecipeName : {
        type : String,
        required: true
    },
    RecipeIngredients : {
        type : String,
        required: true
    }, 
    RecipeDirections : {
        type : String,
        required: true
    }, 
    IsPublic : {
        type : Boolean
    },
    Tags : [{
        type: String
    }],
    RecipeImageID: {
    type:String,
    required:true,
    default:"https://i.stack.imgur.com/34AD2.jpg"
    },
    UserID: {
        type : String,
        required: true
    }
}, { collection: 'Recipes' } );

module.exports = mongoose.model("Recipe", recipeSchema);