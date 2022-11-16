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
        type : Boolean,
        required: true,
    },
    Tags : [{
        type: String
    }],
    UserID : mongoose.SchemaTypes.ObjectId
}, { collection: 'Recipes' } );

module.exports = mongoose.model("Recipe", recipeSchema);