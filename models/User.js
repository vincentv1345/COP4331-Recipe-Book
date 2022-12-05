const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    DateCreated : {
        type : Date,
        immutable : true,
        default : () => Date.now(),
    },
    DateLastLoggedIn : {
        type : Date,
        default : () => Date.now(),
    },
    Username : {
        type : String,
        required: true,
        unique: true 
    },
    Password : {
        type : String,
        required: true
    },
    Bio : String,
    Email : {
        type : String,
        required: true,
        lowercase: true,
        unique: true 
    },
    Verified : {
        type : Boolean,
        default : false
    },
    EmailCode : {
        type : Number,
        unique: true
    },
    Recipe:{
        type: Array,
        default: true
    },
    RecipeList:[{type:mongoose.SchemaTypes.ObjectId, ref:'Recipes'}],
    Favorites : [{type: mongoose.SchemaTypes.ObjectId, ref:'Recipes'}],
    Following : [{type:mongoose.SchemaTypes.ObjectId, ref:'Recipes'}]
}, { collection: 'Users'});

module.exports = mongoose.model("User", userSchema);