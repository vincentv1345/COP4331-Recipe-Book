require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;
const User = require("./models/User");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const testFlag = 0;

const { ObjectID } = require('bson');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.error('Connected to Database'));

app.use(bodyParser.json());
app.set( 'port', ( process.env.PORT || 5000 ));
app.use(cors());

//app.get('/', (req, res) => res.send('Hell World!')); // Testing, DELETE later

let path1;


/*
const root = express.Router();

const buildPath = path.normalize(path.join(__dirname, './frontend/build'))
root.get('(/*)?', async (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(root);
*/

/*
console.log("Im a hosted server")
// Set static folder
app.use(express.static('frontend/build'));

path1 = path.join(__dirname, 'frontend', 'build', 'index.html'); //path.resolve
console.log("path1: " + path1);
app.get('*', (req, res,) =>  //app.use((req, res, next)
{
    res.sendFile(path1);
});
*/

  /*
if(process.env.NODE_ENV === 'development')
{
  console.log("Im a local server");

  app.use(express.static('frontend/build'));

 app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
*/

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/api/login', async (req, res) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    console.log("Inside api login");
        
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

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});