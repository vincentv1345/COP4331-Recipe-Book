const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');
  
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = ImageMode = new mongoose.model('imageModel', imageSchema);