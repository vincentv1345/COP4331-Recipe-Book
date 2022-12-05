const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    DateCreated : {
        type : Date,
        immutable : true,
        default : () => Date.now(),
    },
    IsPublic : {
        type : Boolean,
        required: true,
    },
    RecipeDirections : {
        type : String,
        required: true
    },
    RecipeIngredients : {
        type : String,
        required: true
    },  
    RecipeName : {
        type : String,
        required: true
    },
    Tags : [{
        type: String
    }],
    
    Users_id : [mongoose.SchemaTypes.ObjectId]
}, { collection: 'Recipes' } );

module.exports = mongoose.model("Recipe", recipeSchema);