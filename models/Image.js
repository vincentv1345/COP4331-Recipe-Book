const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');
  
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    recipeID:{
        type: String,
        required:true
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = ImageModel = new mongoose.model('imageModel', imageSchema);