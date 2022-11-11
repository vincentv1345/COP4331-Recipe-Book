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
require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;
var User = require("./models/User");
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var PORT = process.env.PORT || 5000;
var testFlag = 0;
var ObjectID = require('bson').ObjectID;
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
var db = mongoose.connection;
db.on('error', function (error) { return console.error(error); });
db.once('open', function () { return console.error('Connected to Database'); });
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.use(cors());
//app.get('/', (req, res) => res.send('Hell World!')); // Testing, DELETE later
var path1;
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
app.get("/api", function (req, res) {
    res.json({ message: "Hello from server!" });
});
app.post('/api/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, Username, Password, user, result, id, ret, e_1, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // incoming: login, password
                // outgoing: id, firstName, lastName, error
                console.log("Inside api login");
                _a = req.body, Username = _a.Username, Password = _a.Password;
                user = { Username: Username, Password: Password };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.find(user)];
            case 2:
                result = _b.sent();
                if (result.length == 1) {
                    console.log("Found User!");
                    id = result[0]._id;
                    ret = { id: id };
                    res.status(200).json(ret);
                }
                else if (result.length == 0)
                    res.status(400).json("No user found :(");
                else
                    res.status(400).json("ERROR: more then one user with same username and password");
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                error = e_1.toString();
                res.status(400).json(error);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/create_user', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var Bio, Favorites, Follwing, _a, Username, Password, Email, newUser, result, id, ret, e_2, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Bio = "";
                Favorites = [];
                Follwing = [];
                _a = req.body, Username = _a.Username, Password = _a.Password, Email = _a.Email;
                newUser = { Username: Username, Password: Password, Bio: Bio, Email: Email, Favorites: Favorites, Follwing: Follwing };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.create(newUser)];
            case 2:
                result = _b.sent();
                id = result._id;
                ret = { id: id };
                res.status(200).json(ret);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                error = e_2.toString();
                res.status(400).json(error);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});
app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});
