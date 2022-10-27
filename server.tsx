import { resourceLimits } from "worker_threads";

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
app.emitt('port', (process.env.PORT|| 5000));
app.use(cors());
app.use(bodyParser.json());
const mssql = require("mysql");
 
*/

const express = require('express'); // Used to create API
const bodyParser = require('body-parser'); // Checks HTML and JSON parsing
const cors = require('cors'); // Prevents CORS errors

const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
app.set( 'port', (process.env.PORT || 5000 ));
app.use(cors());
app.use(bodyParser.json());

// Get request
/*
app.get('/', function (req, res) {
 
    // Config your database credential
    const config = {
        user: 'SA',
        password: 'Your_Password',
        server: 'localhost',
        database: 'geek'
    };
 
    // Connect to your database
    mssql.connect(config, function (err) {
 
        // Create Request object to perform
        // query operation
        var request = new mssql.Request();
 
        // Query to the database and get the records
        request.query('select * from student',
            function (err, records) {
 
                if (err) console.log(err)
 
                // Send records as a response
                // to browser
                res.send(records);
 
            });
    });
});
*/

// login with username and password
app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
	
  var error = '';

  const { login, password } = req.body;

  const db = client.db("COOKBOOKDATABASE"); 
  const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

  var id = -1;
  var fn = '';
  var ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserID;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }
  /*
  if(login.toLowerCase() == "jesse" && password == "j")
  {
      id = 1;
      fn = 'Jesse';
      ln = 'Johnson';
  }
  else
  {
      error = "login error";
  }
  */

  var ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});

// Handles all incoming requests we havnt handled from above
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


/*
var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});
*/

// For testing, DELETE
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/create_user',async (req, res, next) => {
  
  
  const { DateCreated, DateLastLoggedIn, UserName, Password, Email } = req.body;

  const newUser = {DateCreated: DateCreated, lastLogin: DateLastLoggedIn, userName: UserName, password: Password, email: Email};
  
  var error = '';
  try{
    const db = client.db("COOKBOOKDATABASE");
    const result = db.collection('Users').insert(newUser);
    var dateC = '';
    var dateL = '';
    var userName = '';
    var password = '';
    var email = '';
    if(result.length>0){
      dateC = result[0].DateCreated;
      dateL = result[0].DateLastLoggedIn;
      userName = result[0].UserName;
      password = result[0].Password;
      email = result[0].Email;
    }
    var ret = {DateCreated: dateC, DateLastLoggedIn: dateL, userName: userName, password:password, email:email, error:error};
    res.status(200).json(ret);
  }catch(e){
    error = e.toString();
    res.status(200).json(error);
  }
  
  
});
//Gets dynamically given port number from Heroku

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});
