require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;
const User = require("./models/User");

const port = 4000;
const test = 0;

const { ObjectID } = require('bson');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.error('Connected to Database'));

app.use(express.json());

app.get('/', (req, res) => res.send('Hell World!')); // Testing, DELETE later

app.get('/api/login', async (req, res) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
        
    const { Username, Password } = req.body;
    var user = { Username: Username, Password: Password };

    try{
        const result = await User.find(user);

        if(result.length == 1)
        {
            console.log("Found User!");

            let id = result[0]._id;
            //console.log("id: " + id);

            var ret = { id:id };
            res.status(200).json(ret);
        }
        else if(result.length == 0)
            res.status(400).json("No user found :(");
        else
            res.status(400).json("ERROR: more then one user with same username and password");

    }catch(e){
        let error = e.toString();
        res.status(400).json(error);
    }
});

app.post('/api/create_user',async (req, res) => {
  
    //var objectid = new ObjectID();
    var Bio = "";
    const Favorites = [];
    const Follwing = [];

    //console.log("objectID: " + objectid);
  
    const { Username, Password, Email } = req.body;
  
    const newUser = { Username: Username, Password: Password, Bio: Bio, Email: Email, Favorites: Favorites, Follwing: Follwing};

    try{
        //const result = db.collection('Users').insertOne(newUser);
        const result = await User.create(newUser);
        //console.log(result);

        let id = result._id;
        //console.log("id" + id);
        var ret = { id:id };

      res.status(200).json(ret);
    }catch(e){
        let error = e.toString();
        res.status(400).json(error);
    }
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));