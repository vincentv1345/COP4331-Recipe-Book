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
    Favorites : [mongoose.SchemaTypes.ObjectId],
    Following : [mongoose.SchemaTypes.ObjectId]
}, { collection: 'Users' } );

module.exports = mongoose.model("User", userSchema);