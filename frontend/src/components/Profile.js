import React from 'react';
import { useState } from 'react';
import ProfilePage from '../pages/ProfilePage';
import padthai from './assets/padthai.jpg';
import pasta from './assets/pasta.webp';
import tacos from './assets/tacos.jpg';
import './assets/Profile.css';
import Popup from './Popup';
import './assets/viewRecipe.css';
import './assets/deleteRecipe.css';
import docreateRecipe from './CreateRecipe';
import houseIcon from './assets/houseIcon.png';
import lookup from './assets/lookup.png';
import postIcon from './assets/postIcon.png';
import profileIcon from './assets/profileIcon.png'
import food from './assets/addPictureIcon.jpg'
//import Popuprecipe from './popup-recipe';

function Profile() {
  let user = localStorage.getItem('user_data');
  user = user.slice(7);
  user = user.slice(0, -2);

  let recipeUserIds = JSON.parse(localStorage.getItem('recipe_user_ids_data'));

  let recipeNames = JSON.parse(localStorage.getItem('recipe_name_data'));
  let directions = JSON.parse(localStorage.getItem('instructions_data'));
  let ingredients = JSON.parse(localStorage.getItem('ingredients_data'));
  let images = JSON.parse(localStorage.getItem('recipe_images_data'));
  
  let username = localStorage.getItem('username_data');
  username = username.slice(13);
  username = username.slice(0, -2);
  //{"Username":"Username"}

  const numRecipes = 3;
  const numFollowers = 5;
  const numFollowing = 10;
  var recipeid;
  
  // let bio = "This is a bio. It is very cool and says words";
  let bio = localStorage.getItem('bio_data');
  bio = bio.slice(8);
  bio = bio.slice(0, -2);
  //var email = "email-example@gmail.com";

  let email = localStorage.getItem('email_data');
  email = email.slice(10);
  email = email.slice(0,-2);

  
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = React.useState("");
  const[isRecipePopUP, setIsRecipePopUP] = useState(false);
  

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  const togglerecipePopup = () => {
    setIsRecipePopUP(!isRecipePopUP);
  }
  
  const handlerecipeClick = recipe_ID=> {
    localStorage.setItem("recipe_ID", recipe_ID);
    setIsRecipePopUP(!isRecipePopUP);
    return(togglerecipePopup)
  }

  

  // const doDeleteRecipe = async event => {
  //   event.preventDefault();
    
  //   // fix
  //   var obj = {
  //     //RecipeID: Recipe.id????????????????????????
  //   }

  //   var js = JSON.stringify(obj);
  //   try
  //     {    
  //       const response = await fetch('http://localhost:5000/api/delete_recipe', { mode: 'cors' },
  //           {method:'PATCH',body:js,headers:{'Content-Type': 'application/json'}});
  //       var stringified = JSON.stringify(await response.text()); 
  //       var res = JSON.parse(stringified);

  //     }
  //     catch(e)
  //     {
  //       alert(e.toString());
        
  //       return;
  //     } 
  // }

  const doEditProfile = async event => {
    event.preventDefault();
    
    let usernamenew = document.getElementById("username").value;
    let bionew = document.getElementById("bio").value;

    var obj = {
      UserID: user, 
      Username: usernamenew, 
      Bio: bionew, 
    }

    var js = JSON.stringify(obj);
    console.log("js: " + js);
    try
      {    
        //COMMENT OUT when running through HEROKU
          // const response = await fetch(buildPath('api/update_user'), 
          // {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        // UNCOMMENT OUT when running locally
        const response = await fetch('http://localhost:5000/api/update_user',
          {method:'PATCH',body:js,headers:{'Content-Type': 'application/json'}});

        console.log("In update user try");

        username = {Username: usernamenew};
        bio = {Bio: bionew};

        localStorage.setItem('username_data', JSON.stringify(username));
        localStorage.setItem('bio_data', JSON.stringify(bio));

        window.location.href = '/profile';
      }
      catch(e)
      {
        alert(e.toString());
        
        return;
      }    
  }

  const logout = () => {
    localStorage.removeItem('username_data');
    localStorage.removeItem('bio_data');
    localStorage.removeItem('email_data');
    localStorage.removeItem('following_data');
    localStorage.removeItem('email_data');
    localStorage.removeItem('recipe_ID');

    window.location.href = '/';
  }

  // profile pic, username, num recipes, num followers, num following, bio
  // edit profile button
  return (
    <title>Cookbook</title>,
    <body>
      <div className="Profile" id="welcome">
        <header className="App-header-profile">
          <div className='NavigationBar'>
            <h1 className="Header-link-nav-bar" id="title">
              <a>Cookbook</a>


            </h1>
            <div classname="homeButton-profile">
              <a href="./homepage">
                <input type="image" src={houseIcon} className="App-logoHome-profile"></input>
              </a>
            </div>
            <div className='SearchBar-nav-bar' id="search">
              <input type="text" className="SearchBar-Textbox-nav-bar" cols="79" maxlength="79" placeholder="Search" ></input>
            </div>
            <div className='SearchBar-postButton-nav-bar'>
              <input type="image" src={lookup} className="mag-img-nav-bar"></input>
            </div>
            <div className='postButton-nav-bar'>
              <input type="image" src={postIcon} className="post-img-nav-bar" ></input>

            </div>
            <div className='profileButton-nav-bar'>
              <input type="image" src={profileIcon} className="profile-img-nav-bar"></input>
            </div>
            <div id="horizontal-line-nav-bar"></div>
          </div>


          <div className="main-content-profile">
            <div class="circle-profile"></div>
            <div class="recipes-text-profile"> {numRecipes} recipes</div>
            <div class="username-text-profile"> {username}</div>
            <div class="followers-text-profile"> {numFollowers} followers</div>
            <div class="following-text-profile"> {numFollowing} following</div>
            <div class="bio-text-profile"> {bio}</div>
            <hr></hr>
            <div class="container-profile">
              <ul class="image-gallery-profile">
                { recipeUserIds.map((ID, index) => ID === user &&(
                  <li>
                  <img id = {JSON.stringify(index)} src={pasta} alt="" onMouseDown={(event) => event.stopPropagation()} onClick={(event) => {

                    handlerecipeClick(index);
                    
                    event.stopPropagation();
                    event.preventDefault();
                  }} />
                  <div class="overlay">
                    <span className='recipe-title-profile'>{recipeNames[index]}</span>
                  </div>
                  </li> 
              ))}
              </ul>

            </div>
            
          </div>
          <div>
          
            <input type="button" className="button-edit-profile" value="Edit Profile" onClick={togglePopup}></input>
                <div>
                <a href = './'>
                 <button className = 'logoutButton' type = "button" onClick={logout}>Logout</button>
                </a>
              </div>
            {isOpen && <Popup
              content={<>

                <div>
                  <div className="in-box">
                    <img src={food} className="img-holder"></img>

                    <div className="text-area">
                      <ul className="list-create">
                        <li><div className="name-text">Username<input id="username" type="name" name="Username" cols="79" maxlength="79" placeholder={username} ></input></div></li>
                        <li><div className="name-text">Bio<textarea id="bio" type="bio" name="Bio" className="large-box" rows="3" cols="79" placeholder={bio}></textarea></div></li>

                        <div className="bottom-container">
                          <div className="button-container">
                            <button className="button-save" href="./profile" onClick={doEditProfile} >Save</button>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </>}
              handleClose={togglePopup}
            />}
            {isRecipePopUP && <Popuprecipe 
              index = {localStorage.getItem("recipe_ID")}
              ID = {recipeUserIds[localStorage.getItem("recipe_ID")]}
              recipeName = {recipeNames[localStorage.getItem("recipe_ID")]} 
              ingredients = {ingredients[localStorage.getItem('recipe_ID')]}
              directions = {directions[localStorage.getItem('recipe_ID')]}
              image = {padthai}
              handleClose={togglerecipePopup}
              
            />} 
          </div>
        </header>
      </div>
    </body>
  )
}

export default Profile;

const Popuprecipe = (props) => {

  const[isDeletePopUP, setIsDeletePopUP] = useState(false);

  const toggledeletePopup = () => {
    setIsDeletePopUP(!isDeletePopUP);
  }
  const doDeleteRecipe = async recipe_ID => {
    
    setIsDeletePopUP(!isDeletePopUP);
    console.log("recipeid.value: " + recipe_ID);
    var js = JSON.stringify(recipe_ID);
    console.log("js: " + js);

    try
        {    
          //COMMENT OUT when running through HEROKU
          // const response = await fetch(buildPath('api/login'), 
          // {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          // UNCOMMENT OUT when running locally
          let response = await fetch('http://localhost:5000/api/delete_recipe',
          {method:'delete',body:js,headers:{'Content-Type': 'application/json'}});
        
          console.log("Delete try");
          
          window.location.href = '/profile';
          return toggledeletePopup;
        }
        catch(e)
        {
          alert(e.toString());
          return;
        }    
  }
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
                        <div className = "bottom-container-recipe">
                        <div className="button-container-recipe">
                            <button className="button-recipe-delete" onMouseDown={(event) => event.stopPropagation()} onClick={(event) => {
                                doDeleteRecipe(props.ID)
                    
                                event.stopPropagation();
                                event.preventDefault();
                              }} >Delete</button>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
      </div>
      {isDeletePopUP && <deleteRecipePopup ID = {props.ID} name = {props.recipeName} handleClose = {toggledeletePopup}/>} 
    </div>
  );
};

const deleteRecipePopup = (props) =>  {
  return (
    <div className="popup-delete">
      <div className="popup-delete-box">
        <span className="close-icon-delete" onClick={props.handleClose}>x</span>
        <div>
                  <div className="in-box-delete">
                    <div className="text-area-delete">
                      <ul className="list-view-delete">
                        <li><div className="recipe-element-delete">Are you sure you want to delete {props.name} ?</div></li>

                        <div className = "bottom-container-delete">
                        <div className="button-container-delete">
                            <button className="button-recipe-confirm"  onClick={props.doDeleteRecipe} >Confirm</button>
                            <button className="button-recipe-confirm"  onClick={null} >Cancel</button>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
      </div>

    </div>
  );
};