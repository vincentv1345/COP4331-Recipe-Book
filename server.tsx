/*
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();


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

const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb+srv://RickLeinecker:WeLoveCOP4331@cluster0.ehunp00.mongodb.net/?retryWrites=true&w=majority';
const url = process.env.MONGODB_URI;

const client = new MongoClient(url);
client.connect();

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


app.post('/api/sign-up', async (req, res, next) =>
{
    var error = '';

    const { login, password, email } = req.body;

    var id = -1;
    var fn = '';
    var ln = '';
  
    if(login.toLowerCase() == "jesse" && password == "j" && email == "j@gmail.com")
    {
        id = 1;
        fn = 'Jesse';
        ln = 'Johnson';
    }
    else
    {
        error = "login error";
    }
  

  /*
  userID                  INT NOT NULL AUTO_INCREMENT,
  DateCreated             DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  DateLastLoggedIn        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  UserName VARCHAR(50)    NOT NULL DEFAULT '' ,
  Password VARCHAR(50)    NOT NULL DEFAULT '' ,
  Email    VARCHAR(50)    NOT NULL DEFAULT '' ,
  Bio VARCHAR(280)        NOT NULL DEFAULT '' ,
  profileImageName        VARCHAR (100),
  imageData               BINARY (max),
  PRIMARY KEY (userID)
  */
  
  var ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);

})


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


//Gets dynamically given port number from Heroku

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});
