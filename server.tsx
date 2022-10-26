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
 
// Get request
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
 
var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});