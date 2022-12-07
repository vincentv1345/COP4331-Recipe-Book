import React from 'react';
import { useState, useLayoutEffect } from 'react';
import cookbook from './assets/cookbook.png';
import houseIcon from './assets/houseIcon.png';
import lookup from './assets/lookup.png';
import postIcon from './assets/postIcon.png';
import profileIcon from './assets/profileIcon.png'
import './assets/homepage.css';
import './assets/viewRecipe.css';
import docreateRecipe from './CreateRecipe';
import Popup from './Popup';
import food from './assets/food.jpg';
import margarita from './assets/Margarita.jpg';
import tacos from './assets/tacos.jpg';
import racoon from './assets/raccoon.jpg'
import garden from './assets/garden.jpg';
import cake from './assets/cake.jpg';
import cake2 from './assets/fluffy-homemade-vanilla-cake-995187-hero-01-cb314e573db94d49a49b2c348099e7b2.webp';
import pasta from './assets/pasta.jpg';
import padthai from './assets/padthai.jpg';


function HomePage() {

  console.log("In login function");
  const app_name = 'recipebook5959';
  function buildPath(route)
  {
      if (process.env.NODE_ENV === 'production') 
      {
          console.log("CHECK: In Heroku server");
          return 'https://' + app_name +  '.herokuapp.com/' + route;
      }
      else
      {       
          console.log("CHECK: In local server"); 
          return 'http://localhost:5000/' + route;
      }
  }

  useLayoutEffect (() => {
    doSearch();
  }, [])

  /*profileButton = document.createElement("button");
  profileButton.innerHTML = '<img src="https://www.pngwing.com/en/free-png-nlvhq" />'
  profileButton.onclick = function () {
      //CHANGE THE LOCATION TO ACTUAL PAGE
      location.href = "www.flavordaddy.xyz";
  }
  let addPostButton = document.createElement("button");
  addPostButton.innerHTML = '<img src="https://www.pngwing.com/en/free-png-nlvhq" />'
  */



  let recipeNames = JSON.parse(localStorage.getItem('recipe_name_data'))|| [];
  let directions = JSON.parse(localStorage.getItem('instructions_data'))|| [];
  let ingredients = JSON.parse(localStorage.getItem('ingredients_data'))|| [];
  let images = JSON.parse(localStorage.getItem('recipe_images_data'))|| [];


 const [isOpen, setIsOpen] = useState(false);
 const[isRecipePopUP, setIsRecipePopUP] = useState(false);

 
 let user = localStorage.getItem('user_data');
 user = user.slice(7);
 user = user.slice(0, -2);
 console.log("Found User on homepage!");
 console.log("user: " + user);
 let recipe_id = localStorage.getItem('recipe_name_data');

 const getImages = recipeName => {
  if(recipeName === "A Tasty Pasta"){
    return(pasta);
  }
  else if(recipeName === "Tuesday Tacos"){
    return(tacos);
  }
  else if(recipeName === "Veg Pad Thai"){
    return( padthai);
  }
  else if(recipeName === "Delicious Raccoon"){
    return(racoon);
  }
  else if(recipeName === "Vanilla Cake"){
    return(cake2);
  }
  else if(recipeName === "Cake"){
    return(cake);
  }
  else if(recipeName === "Paradise Margarita"){
    return(margarita);
  }
  else{
    return(food);
  }
};

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const togglerecipePopup = () => {
    setIsRecipePopUP(!isRecipePopUP);
  };

  const handlerecipeClick = recipe_ID=> {
    if(recipeNames[localStorage.getItem("recipe_ID")] === "A Tasty Pasta"){
      localStorage.setItem("recipe_image", pasta);
    }
    else if(recipeNames[localStorage.getItem("recipe_ID")] === "Tuesday Tacos"){
      localStorage.setItem("recipe_image", tacos);
    }
    else if(recipeNames[localStorage.getItem("recipe_ID")] === "Veg Pad Thai"){
      localStorage.setItem("recipe_image", padthai);
    }
    else if(recipeNames[localStorage.getItem("recipe_ID")] === "Delicious Raccoon"){
      localStorage.setItem("recipe_image", racoon);
    }
    else if(recipeNames[localStorage.getItem("recipe_ID")] === "Vanilla Cake"){
      localStorage.setItem("recipe_image", cake2);
    }
    else if(recipeNames[localStorage.getItem("recipe_ID")] === "Cake"){
      localStorage.setItem("recipe_image", cake);
    }
    else if(recipeNames[localStorage.getItem("recipe_ID")] === "Paradise Margarita"){
      localStorage.setItem("recipe_image", margarita);
    }
    else{
      localStorage.setItem("recipe_image", food);
    }
    localStorage.setItem("recipe_ID", recipe_ID);
    
    return(togglerecipePopup);
  };

  
  const [error, setError] = React.useState("");
  const [tags, setTags] = React.useState([]);

  const handleTags = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
    else if (event.key === "Backspace" && tags.length && event.target.value == 0) {
      const tagsCopy = [...tags];
      tagsCopy.pop();
      event.preventDefault();
      setTags(tagsCopy);
    }
    else if (tags.length < 1 && event.key === "Backspace") {
      setError("");
    }
    else if (event.target.value == "" && event.key === "Enter") {
      setError("");
    }
  };

  //Remove tags by clicking the cross sign
  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  //To update the error after user changes something
  const handleError = () => {
    setError("");
  };

  const doSearch = async event => {

    let recipename = document.getElementById("searchTerm");
    console.log("recipename: " + recipeNames);
    
    var obj = {
      RecipeName: recipename.value
    };
    console.log("obj" + obj);
    var js = JSON.stringify(obj);
    console.log("js" + js);

    let response;
    try
      {    
        response = await fetch('https://recipebook5959.herokuapp.com/api/search_recipe',
           {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var responseClone = response.clone();



        console.log("Create recipe try");
        var res;
        try {
          res = JSON.parse(await responseClone.text());
        //console.log(JSON.parse(ingred));
        }
        catch(e)
        {
          
          console.log('Error parsing JSON:', e, await response.text());
        }

        
        // let data1 = JSON.parse(localStorage.getItem('recipe_name_data'));
          let recipes = [];
          let user_ids = [];
          let ingredients = [];
          let directions = [];
          let images = [];
          
          for(let i = 0; i < res.length; i++){

            Object.keys(res[i]).forEach(function (item) {
              if(item === 'RecipeDirections'){
                directions.push(res[i][item])
              }
              if(item === 'UserID'){
                user_ids.push(res[i][item])
              }
              if(item === 'RecipeImageID'){
                images.push(res[i][item])
              }
              else if(item === 'RecipeIngredients'){
                ingredients.push(res[i][item])
              }
              else if(item === 'RecipeName'){
                recipes.push(res[i][item])
              }
            });
            }
            console.log("array: " + recipes);
          localStorage.setItem('recipe_images_data', JSON.stringify(Object.values(images)));
          localStorage.setItem('recipe_name_data', JSON.stringify(Object.values(recipes)));
          localStorage.setItem('recipe_user_ids_data', JSON.stringify(Object.values(user_ids)));
          localStorage.setItem('ingredients_data', JSON.stringify(Object.values(ingredients)));
          localStorage.setItem('instructions_data', JSON.stringify(Object.values(directions)));
          console.log("local storage"+ localStorage.getItem('recipe_name_data'));
        
       // console.log("res " + JSON.stringify(res));
       
      }
      catch(e)
      {
        alert(e.toString());
        console.log("Failed to get API call. response" + res);
        return;
      }
  };

  const create = async event =>
  {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let ingredients = document.getElementById("ingredients").value;
    let directions = document.getElementById("directions").value;

    var obj = {
      UserID: user, 
      RecipeName: name, 
      RecipeIngredients: ingredients, 
      RecipeDirections: directions
      }

    var js = JSON.stringify(obj);
    console.log("js: " + js);

    let response;

    try
    {
      //COMMENT OUT when running through HEROKU
      response = await fetch(buildPath('api/create_recipe'), 
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      // UNCOMMENT OUT when running locally
      //response = await fetch('http://localhost:5000/api/create_recipe',
      //{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      var res;
      try {
        res = JSON.parse(await response.text());
      }
      catch(e)
      {
        console.log(e);
      }
      
      window.location.href = '/homepage';
    }
    catch(e)
    {
      alert(e.toString());
      console.log("Failed to get API call. response" + response);
      return;
    }
};


  return (
    <body>
      <header className="App-header">
        <div className='NavigationBar'>
          <h1 className="Header-link" id="title">
            <a>Cookbook</a>
            <img src={houseIcon} className="App-logoHome" alt="logo" />
          </h1>
          <div className='SearchBar' id="search">
            <input type="text" className="SearchBar-Textbox" id = "searchTerm" cols="79" maxlength="79" placeholder="Search"></input>
          </div>
          <div className='SearchBar-postButton' onClick={doSearch}>
            <input type="image" src={lookup} className="mag-img" ></input>
          </div>

          <div className='postButton'>
          <input type="image" src={postIcon} className="post-img" onClick={togglePopup}></input>
          {isOpen && <Popup
            content={<>

              <div>
                <div className="in-box">
                  <input type="file" src={food} className="inputHolder"></input>

                  <div className="text-area">
                    <ul className="list-create">
                      <li><div className="name-text">Name<input id="name" type="name" name="name" cols="79" maxlength="79" placeholder="Like 'Delicious Recipe'" ></input></div></li>
                      <li><textarea id="ingredients" type="ingredients" name="ingredients" className="large-box" rows="3" cols="79" placeholder="Write your ingredients here." ></textarea></li>
                      <li><textarea id="directions" type="directions" name="directions" className="large-box" rows="3" cols="79" placeholder="Write your directions here." ></textarea></li>
                    </ul>

                    <div className="bottom-container">
                      <div className="tags">
                        {tags.map((tag, index) => (
                          <div className="single-tag" key={index}>
                            <span>{tag}</span>
                            <i
                              onClick={() => removeTags(index)}
                            >
                              <MdClose />
                            </i>
                          </div>
                        ))}

                        <input
                          className="write-tag"
                          type="text"
                          onKeyDown={event => handleTags(event)}
                          onChange={handleError}
                          placeholder="Write your tag here."
                        />
                      </div>

                      <div className="error">
                        {error}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <button className="button-create" onClick={create} >Create</button>
                </div>
              </div>

            </>}
            handleClose={togglePopup}
          />}
        </div>
        <div className='profileButton' >
          <a href="./profile">
            <input type="image" src={profileIcon} className="profile-img" ></input>
          </a>
        </div>
        <div id="horizontal-line"></div>


        </div>

        <div class="main-content-home">
          <ul class="image-gallery">
          { 
            console.log(recipeNames)}
        
            {recipeNames.map((ID, index) => (
                  <li>
                  <img id = {JSON.stringify(index)} src={getImages(recipeNames[index])}  alt="" onMouseDown={(event) => event.stopPropagation()} onClick={(event) => {
                    handlerecipeClick(index);
                    
                    event.stopPropagation();
                    event.preventDefault();
                  }} />
                  <div class="overlay">
                    <span className='recipe-title-profile'>{ID}</span>
                  </div>
                  </li> 
              ))}
          </ul>
        </div>
        {isRecipePopUP && <Popuprecipe 
              ID = {localStorage.getItem("recipe_ID")}
              recipeName = {recipeNames[localStorage.getItem("recipe_ID")]} 
              ingredients = {ingredients[localStorage.getItem('recipe_ID')]}
              directions = {directions[localStorage.getItem('recipe_ID')]}
              image = {padthai}
              handleClose={togglerecipePopup}
              
            />}


    </header>
      </body >
    );
};
export default HomePage;

const Popuprecipe = (props) => {


  return (
    <div className="popup-recipe">
      <div className="popup-recipe-box">
        <span className="close-icon-recipe" onClick={props.handleClose}>x</span>
        <div>
                  <div className="in-box-recipe">
                    <img src={props.image} className="img-holder"></img>
                    <div className="text-area-recipe">
                      <ul className="list-view-recipe">
                        <li><div className="recipe-popup-title">{props.recipeName}</div></li>
                        <li><div className="recipe-element-title">Ingredients:</div></li>
                         <li><div classname= "name-text-recipe" cols="20" maxlength="20">{props.ingredients}</div></li>
                        <li><div className="recipe-element-title">Directions:</div> </li>
                        <li><div classname= "name-text-recipe" cols="79" maxlength="79">{props.directions}</div></li>
                      </ul>
                    </div>
                  </div>
                </div>
      </div>
     
    </div>
  );
};
