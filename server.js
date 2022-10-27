/*
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();


>>>>>>> 9e9241502b41a9176aef6d41b8537cfbc2e10f37
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express'); // Used to create API
var bodyParser = require('body-parser'); // Checks HTML and JSON parsing
var cors = require('cors'); // Prevents CORS errors
var path = require('path');
var PORT = process.env.PORT || 5000;
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var url = process.env.MONGODB_URI;
var client = new MongoClient(url);
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
/*
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
  

  
  //userID                  INT NOT NULL AUTO_INCREMENT,
  //DateCreated             DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  //DateLastLoggedIn        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  //UserName VARCHAR(50)    NOT NULL DEFAULT '' ,
  //Password VARCHAR(50)    NOT NULL DEFAULT '' ,
  //Email    VARCHAR(50)    NOT NULL DEFAULT '' ,
  //Bio VARCHAR(280)        NOT NULL DEFAULT '' ,
  //profileImageName        VARCHAR (100),
  //imageData               BINARY (max),
  //PRIMARY KEY (userID)
  
  
  var ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);

})
*/
// login with username and password
app.post('/api/login', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var error, _a, login, password, db, results, id, fn, ln, ret;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = '';
                _a = req.body, login = _a.login, password = _a.password;
                db = client.db("COOKBOOKDATABASE");
                return [4 /*yield*/, db.collection('Users').find({ Login: login, Password: password }).toArray()];
            case 1:
                results = _b.sent();
                id = -1;
                fn = '';
                ln = '';
                if (results.length > 0) {
                    id = results[0].UserID;
                    fn = results[0].FirstName;
                    ln = results[0].LastName;
                }
                ret = { id: id, firstName: fn, lastName: ln, error: '' };
                res.status(200).json(ret);
                return [2 /*return*/];
        }
    });
}); });
// Handles all incoming requests we havnt handled from above
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
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
app.post('/api/create_user', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var _a, DateCreated, DateLastLoggedIn, UserName, Password, Email, newUser, error, db, result, dateC, dateL, userName, password, email, ret;
    return __generator(this, function (_b) {
        _a = req.body, DateCreated = _a.DateCreated, DateLastLoggedIn = _a.DateLastLoggedIn, UserName = _a.UserName, Password = _a.Password, Email = _a.Email;
        newUser = { DateCreated: DateCreated, lastLogin: DateLastLoggedIn, userName: UserName, password: Password, email: Email };
        error = "status 404";
        try {
            db = client.db("COOKBOOKDATABASE");
            result = db.collection('Users').insert(newUser);
            dateC = '';
            dateL = '';
            userName = '';
            password = '';
            email = '';
            if (result.length > 0) {
                dateC = result[0].DateCreated;
                dateL = result[0].DateLastLoggedIn;
                userName = result[0].UserName;
                password = result[0].Password;
                email = result[0].Email;
            }
            ret = { DateCreated: dateC, DateLastLoggedIn: dateL, userName: userName, password: password, email: email, error: error };
            res.status(200).json(ret);
        }
        catch (e) {
            error = e.toString();
            res.status(200).json(error);
        }
        return [2 /*return*/];
    });
}); });
//Gets dynamically given port number from Heroku
app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});
