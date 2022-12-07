import { createCipheriv } from "crypto";
import { dnsCache } from "nodemailer/lib/shared";

require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;
const User = require("./models/User");
const Recipe = require("./models/Recipes");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;
const testFlag = 0;

const ImageModel = require("./models/Image");

const { ObjectID } = require('bson');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
//store images
const Storage = multer.diskStorage({
  destination:"uploads",
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
});

const upload = multer({
  storage: Storage
}).single('testImage')

app.get('/api/get_image', (req, res) => {
  ImageModel.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.render('imagesPage', { items: items });
      }
  });
});
app.post('/api/upload_image',(req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log(err)
    }else{
      const newImage = new ImageModel({
        name:req.body.name,
        image:{
          data:req.file.filename,
          contentType:'image/png'
        }
      })
      newImage.save()
      .then(()=>res.send('sucessfully uploaded')).catch(err=>console.log(err))
    }
  })
})
db.on('error', (error) => console.error(error));
db.once('open', () => console.error('Connected to Database'));

app.use(bodyParser.json());
app.set( 'port', ( process.env.PORT || 5000 ));
app.use(cors());

//store images

//COMMENT OUT when running locally
if(process.env.NODE_ENV === 'production')
{
  console.log("Im a local server");

  app.use(express.static('frontend/build'));

 app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

/*
const root = express.Router();

const buildPath = path.normalize(path.join(__dirname, './frontend/build'))
root.get('(/*)?', async (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(root);
*/

let path1;

app.get("/api/", (req, res) => {
  console.log("Test from API");
  res.status(200).json({ message: "Hello from server!" });
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
            console.log("user: " + result[0]);

            let id = result[0]._id;
            let DateCreated = result[0].DateCreated;
            let DateLastLoggedIn = result[0].DateLastLoggedIn;
            let Username = result[0].Username;
            let Bio = result[0].Bio;
            let Email = result[0].Email;
            let Verified = result[0].Verified;
            let EmailCode = result[0].EmailCode;
            let RecipeList = result[0].RecipeList;
            let Favorites = result[0].Favorites;
            let Following = result[0].Following;
            //console.log("id: " + id);


            var ret = { id:id, DateCreated: DateCreated, DateLastLoggedIn: DateLastLoggedIn, Username: Username, Password: Password, Bio: Bio, Email: Email, Favorites: Favorites, RecipeList: RecipeList, Follwing: Following, Verified: Verified, EmailCode: EmailCode };
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

// Creates user and send verification email
app.post('/api/create_user',async (req, res) => {
    var Bio = "";
    let Verified = false;
    const Favorites = [];
    const Following = [];
    let EmailCode = Math.floor((Math.random() * 10000000));

    const { Username, Password, Email } = req.body;
  
    const newUser = { Username: Username, Password: Password, Bio: Bio, Email: Email, Favorites: Favorites, Follwing: Following, Verified: Verified, EmailCode: EmailCode};

    try{
        //const result = db.collection('Users').insertOne(newUser);
        const result = await User.create(newUser);
        //console.log(result);

        let id = result._id;
        console.log("id" + id);
        var ret = { id:id };

        // log in to email account to sent mail from
        var transport = nodemailer.createTransport({
          host: 'smtp.zoho.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ZOHO_USER,
            pass: process.env.ZOHO_PASS
          }
        });
      
        var mainInfo,host,link;
        host = req.get('host');
        link=`http://${host}/api/verify/${EmailCode}`;

        // 
        mainInfo={
            from : process.env.ZOHO_USER,
            to : Email,
            subject : "Please confirm your Email account",
            html : `Please click this link to confirm your email: <a href="${link}">${link}</a>`,
        }
        console.log(mainInfo);

        transport.sendMail(mainInfo, function(error, response){
         if(error){
                console.log(error);
            res.end("error");
         }else{
                console.log("Message sent: " + response.message);
            res.end("sent");
             }
      });

      res.status(200).json(ret);
    }catch(e){
        let error = e.toString();
        res.status(400).json(error);
    }
});

// Attempts to verify user using link
app.get('/api/verify/:EmailCode', async (req, res) => {
  try {
    console.log("Attempting to verify user");
    //console.log("host URL from verifier link: " + req.protocol + ":/" + req.get('host')) // Sanity check
    const { EmailCode } = req.params;

    //console.log("req: " + EmailCode); // Sanity check
    const user = await User.findOne({ EmailCode : EmailCode})

    if (user) {
      console.log("User verified!");
      user.Verified = true;
      await user.save();
      res.redirect('http://www.flavordaddy.xyz/'); // CHANGE to host login page
    }
    else {
      res.status(400).json('Invalid link');
    }
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

app.post("/api/create_recipe",async (req, res) => {
   /*var RecipeName = "";
  var RecipeDirections ="";
  const RecipeIngredients = [];
  const tags = [];*/
  const { UserID, RecipeName, RecipeIngredients, RecipeDirections, IsPublic, Tags,RecipeImage } = req.body;
  const newRecipe = {RecipeName: RecipeName, RecipeIngredients: RecipeIngredients, RecipeDirections: RecipeDirections, IsPublic: IsPublic, Tags:Tags, UserID:UserID,RecipeImage:RecipeImage};
  
  try{
    const result = await Recipe.create(newRecipe);
    //const resultUser = User.findById({_id: new ObjectId(UserID)});
    let id = result._id;
    var ret = { id:id };

    res.status(200).json(ret);
  }catch(e){
    let error = e.toString();
    res.status(400).json(error);
  }
});

app.patch("/api/update_user", async(req, res)=>{
  const { UserID } = req.body;

  try{
    // parameters(id, new info, options (for this it retuns the new updated instance), callback)
    User.findByIdAndUpdate(UserID, {$set: req.body}, {new:true}, (err, user) => {
      if(err)
      {
        console.log(err);
        res.status(400).json(err);
      }
      else
      {
        console.log(user);
        res.status(200).json(User);
      }
    });
  }catch(e){
    res.status(400).json(e.toString());
  }
});

app.patch("/api/update_recipe",async(req,res)=>{
  const { RecipeID } = req.body;

  try{
    // parameters(id, new info, options (for this it retuns the new updated instance), callback)
    Recipe.findByIdAndUpdate(RecipeID, {$set: req.body}, {new:true}, (err, user) => {
      if(err)
      {
        console.log(err);
        res.status(400).json(err);
      }
      else
      {
        console.log(user);
        res.status(200).json(user);
      }
    });
  }catch(e){
    res.status(400).json(e.toString());
  }
});

app.delete("/api/delete_recipe", async(req,res)=>{
  const { RecipeID } = req.body;

  try{
    const result = Recipe.findById({_id: new ObjectId(RecipeID)});
    await result.deleteOne();

    res.status(200).send("Deleted recipe"); //.json(reportInfo)
  }catch(e){
    res.status(400).json(e.toString());
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

app.post("/api/get_recipeList", async(req,res,next)=>{
  try{
    const {UserID} = req.body;
    console.log(UserID); 
    try{
      const searchedRecipe = await Recipe.find({
                UserID:{$regex: `${UserID}`, $options: 'i'}
        })
      res.json(searchedRecipe)
  }catch(err){
      res.status(400).json({message: err.message })
  }
}catch(err){
    res.status(400).json({message: err.message })
}
});

app.post("/api/search_user", async(req,res,next)=>{
  try{
  const {Username} = req.body;
  console.log(Username); 
  try{
    const searchedUsers = await User.find({
              Username:{$regex: `${Username}`, $options: 'i'}
      })
    res.json(searchedUsers)
  }catch(err){
    res.status(400).json({message: err.message })
  }
}catch(err){
  res.status(400).json({message:err.message})
}
});

app.post("/api/search_recipe", async(req,res,next)=>{
  try{
    const {RecipeName} = req.body;
    console.log(RecipeName); 
    try{
      const searchedRecipe = await Recipe.find({
                RecipeName:{$regex: `${RecipeName}`, $options: 'i'}
        })
      res.json(searchedRecipe)
  }catch(err){
      res.status(400).json({message: err.message })
  }
}catch(err){
    res.status(400).json({message: err.message })
}
});
app.post("/api/search_tags", async(req,res,next)=>{
  try{
    const {Tags} = req.body;
    console.log(Tags); 
    try{
      const searchedRecipe = await Recipe.find({
                Tags:{$regex: `${Tags}`, $options: 'i'}
        })
      res.json(searchedRecipe)
  }catch(err){
      res.status(400).json({message: err.message })
  }
}catch(err){
    res.status(400).json({message: err.message })
}
});
app.listen(process.env.PORT || 5000, () => 
{
  console.log('Server listening on port ' + PORT);
});