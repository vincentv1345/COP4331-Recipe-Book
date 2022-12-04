"use strict";
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
exports.__esModule = true;
require('dotenv').config();
var ObjectId = require('mongodb').ObjectID;
var User = require("./models/User");
var Recipe = require("./models/Recipes");
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var nodemailer = require("nodemailer");
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
/*
const root = express.Router();

const buildPath = path.normalize(path.join(__dirname, './frontend/build'))
root.get('(/*)?', async (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use(root);
*/
var path1;
//COMMENT OUT when running locally
if (process.env.NODE_ENV === 'production') {
    console.log("Im a local server");
    app.use(express.static('frontend/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
app.get("/api/", function (req, res) {
    console.log("Test from API");
    res.status(200).json({ message: "Hello from server!" });
});
app.post('/api/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
// Creates user and send verification email
app.post('/api/create_user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Bio, Verified, Favorites, Following, EmailCode, _a, Username, Password, Email, newUser, result, id, ret, transport, mainInfo, host, link, e_2, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Bio = "";
                Verified = false;
                Favorites = [];
                Following = [];
                EmailCode = Math.floor((Math.random() * 100000));
                _a = req.body, Username = _a.Username, Password = _a.Password, Email = _a.Email;
                newUser = { Username: Username, Password: Password, Bio: Bio, Email: Email, Favorites: Favorites, Follwing: Following, Verified: Verified, EmailCode: EmailCode };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.create(newUser)];
            case 2:
                result = _b.sent();
                id = result._id;
                console.log("id" + id);
                ret = { id: id };
                transport = nodemailer.createTransport({
                    host: 'smtp.zoho.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.ZOHO_USER,
                        pass: process.env.ZOHO_PASS
                    }
                });
                host = req.get('host');
                link = "http://".concat(host, "/api/verify/").concat(EmailCode);
                // 
                mainInfo = {
                    from: process.env.ZOHO_USER,
                    to: Email,
                    subject: "Please confirm your Email account",
                    html: "Please click this email to confirm your email: <a href=\"".concat(link, "\">").concat(link, "</a>")
                };
                console.log(mainInfo);
                transport.sendMail(mainInfo, function (error, response) {
                    if (error) {
                        console.log(error);
                        res.end("error");
                    }
                    else {
                        console.log("Message sent: " + response.message);
                        res.end("sent");
                    }
                });
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
// Attempts to verify user using link
app.get('/api/verify/:EmailCode', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var EmailCode, user, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                EmailCode = req.params.EmailCode;
                return [4 /*yield*/, User.findOne({ EmailCode: EmailCode })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.Verified = true;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.redirect('http://www.flavordaddy.xyz/');
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json('Invalid link');
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_3 = _a.sent();
                res.status(400).send(e_3.toString());
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post("/api/create_recipe", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, UserID, RecipeName, RecipeIngredients, RecipeDirections, IsPublic, Tags, newRecipe, result, id, ret, e_4, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, UserID = _a.UserID, RecipeName = _a.RecipeName, RecipeIngredients = _a.RecipeIngredients, RecipeDirections = _a.RecipeDirections, IsPublic = _a.IsPublic, Tags = _a.Tags;
                newRecipe = { RecipeName: RecipeName, RecipeIngredients: RecipeIngredients, RecipeDirections: RecipeDirections, IsPublic: IsPublic, Tags: Tags, UserID: UserID };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Recipe.create(newRecipe)];
            case 2:
                result = _b.sent();
                id = result._id;
                ret = { id: id };
                /*
                try{
                  db.students.updateOne(
                    { _id: UserID },
                    { $push: { scores: id } }
                 )
                }
                catch(e){
                  res.status(400).json(e.toString());
                }
                */
                res.status(200).json(ret);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                error = e_4.toString();
                res.status(400).json(error);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.patch("/api/update_user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var UserID;
    return __generator(this, function (_a) {
        UserID = req.body.UserID;
        try {
            User.findByIdAndUpdate(UserID, { $set: req.body }, { "new": true }, function (err, user) {
                if (err) {
                    console.log(err);
                    res.status(400).json(err);
                }
                else {
                    console.log(user);
                    res.status(200).json(user);
                }
            });
        }
        catch (e) {
            res.status(400).json(e.toString());
        }
        return [2 /*return*/];
    });
}); });
app.patch("/api/update_recipe", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var RecipeID;
    return __generator(this, function (_a) {
        RecipeID = req.body.RecipeID;
        try {
            // parameters(id, new info, options (for this it retuns the new updated instance), callback)
            Recipe.findByIdAndUpdate(RecipeID, { $set: req.body }, { "new": true }, function (err, user) {
                if (err) {
                    console.log(err);
                    res.status(400).json(err);
                }
                else {
                    console.log(user);
                    res.status(200).json(user);
                }
            });
        }
        catch (e) {
            res.status(400).json(e.toString());
        }
        return [2 /*return*/];
    });
}); });
app["delete"]("/api/delete_recipe", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var RecipeID, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                RecipeID = req.body.RecipeID;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                result = Recipe.findById({ _id: new ObjectId(RecipeID) });
                return [4 /*yield*/, result.deleteOne()];
            case 2:
                _a.sent();
                res.status(200).send("Deleted recipe"); //.json(reportInfo)
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.status(400).json(e_5.toString());
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
app.post("/api/search_user", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var Username, searchedUsers, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Username = req.body.Username;
                console.log(Username);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.find({
                        Username: { $regex: "".concat(Username), $options: 'i' }
                    })];
            case 2:
                searchedUsers = _a.sent();
                res.json(searchedUsers);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).json({ message: err_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/api/search_recipe", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var RecipeName, searchedRecipe, err_2, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                RecipeName = req.body.RecipeName;
                console.log(RecipeName);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Recipe.find({
                        RecipeName: { $regex: "".concat(RecipeName), $options: 'i' }
                    })];
            case 2:
                searchedRecipe = _a.sent();
                res.json(searchedRecipe);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400).json({ message: err_2.message });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                res.status(400).json({ message: err_3.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post("/api/search_tags", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var Tags, searchedRecipe, err_4, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                Tags = req.body.Tags;
                console.log(Tags);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Recipe.find({
                        Tags: { $regex: "".concat(Tags), $options: 'i' }
                    })];
            case 2:
                searchedRecipe = _a.sent();
                res.json(searchedRecipe);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400).json({ message: err_4.message });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_5 = _a.sent();
                res.status(400).json({ message: err_5.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});
