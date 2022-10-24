CREATE DATABASE COOKBOOKDATABASE;

USE COOKBOOKDATABASE;

-- Users Table
-- userID = ID for each User
-- DataCreated = the date the account was created
-- DateLastLoggedIn = the date when they last logged into the website
-- Username = Username of the user
-- Password = Their Password
-- Email = Their Email
-- Bio = Their Bio
-- profileImageName = Their Profile Picture
-- imageData = Profile Picture Data
CREATE TABLE COOKBOOKDATABASE.Users
(
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
) ENGINE = InnoDB;

-- Following Table
-- userID = ID for each User
-- followingID = ID of the User they are following
CREATE TABLE COOKBOOKDATABASE.FollowingTable
(
  userID      INT NOT NULL,
  followingID INT NOT NULL,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (following) REFERENCES Users(userID)
) ENGINE = InnoDB;

-- Favorites Table
-- userID = ID for each User
-- favoriteID = ID of the Recipe they Favorite
CREATE TABLE COOKBOOKDATABASE.FavoritesTable
(
  userID  INT NOT NULL,
  favoriteID  INT NOT NULL,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (favoriteID) REFERENCES Recipes(recipesID)
) ENGINE = InnoDB;

-- Cookbooks Table
-- userID = ID for each User
-- cookbookID = ID for each Cookbook
-- DateCreated = the date the account was created
-- IsPublic = Whether or not the cookbook is public
-- cookbookName = Name of the cookbook
-- cookbookImageName = Cookbook image
-- cookbookImageData = cookbook image data
CREATE TABLE COOKBOOKDATABASE.Cookbooks
( 
    userID             INT NOT NULL, 
    cookbookID          INT NOT NULL AUTO_INCREMENT,
    DateCreated         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    IsPublic            BOOLEAN NOT NULL DEFAULT false, 
    cookbookName        VARCHAR(50) NOT NULL DEFAULT '', 
    cookbookImageName   VARCHAR (100),
    cookbookImageData   BINARY (max),
    PRIMARY KEY (cookbookID),
    FOREIGN KEY (userID) REFERENCES Users(userID)
) ENGINE = InnoDB;

-- Who can access cookbooks table (to privately share cookbooks)
-- userID = ID for each User
-- cookbookID = ID for each Cookbook they have access to
CREATE TABLE COOKBOOKDATABASE.CookbookAccess
(
  userID    INT NOT NULL,
  cookbookID  INT NOT NULL,
  FOREIGN KEY(userID) REFERENCES Users('userID'),
  FOREIGN KEY(cookbookID) REFERENCES Cookbooks(cookbookID)
) ENGINE = InnoDB;

-- Recipes table
-- userID = ID for each User
-- cookbookID = ID for each Cookbook
-- recipeID = ID for each Recipe
-- DateCreated = the date the account was created
-- IsPublic = Whether or not the recipe is public
-- RecipeName = Name of the recipe
-- RecipeIngredients = List of ingredients for the recipe
-- RecipeInstructions = Instructions for the recipe
-- RecipeImageName = Cookbook image
-- imageData = cookbook image data
-- tag1 = tagID for the recipe
-- tag2 = tagID for the recipe
-- tag3 = tagID for the recipe
-- tag4 = tagID for the recipe
-- tag5 = tagID for the recipe
CREATE TABLE COOKBOOKDATABASE.Recipes
( 
    userID                   INT NOT NULL,
    cookbookID               INT NOT NULL,
    recipeID                 INT NOT NULL AUTO_INCREMENT,
    DateCreated              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    IsPublic                 BOOLEAN NOT NULL DEFAULT false, 
    RecipeName               VARCHAR(50) NOT NULL DEFAULT 'New Recipe', 
    RecipeIngredients        VARCHAR(10000) NOT NULL DEFAULT 'No Ingredients', 
    RecipeInstructions       VARCHAR(10000) NOT NULL DEFAULT 'No Instructions', 
    RecipeImageName          VARCHAR (100),
    RecipeImageData                BINARY (max),
    tag1                     INT,
    tag2                     INT,
    tag3                     INT,
    tag4                     INT,
    tag5                     INT,
    PRIMARY KEY (recipeID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (cookbookID) REFERENCES Users(cookbookID)
    FOREIGN KEY (tag1, tag2, tag3, tag4, tag5) REFERENCES Tags(tagID)
) ENGINE = InnoDB;

-- Tags table
-- tagID = ID for a Tag
-- tagName = name of the Tag
CREATE TABLE COOKBOOKDATABASE.Tags
(
  tagID    INT NOT NULL,
  tagName  VARCHAR(20) NOT NULL DEFAULT '',
  PRIMARY KEY (tagID)
) ENGINE = InnoDB;