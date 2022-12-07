var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    name: String,
    RecipeID: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);
