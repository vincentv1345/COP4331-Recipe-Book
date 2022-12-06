import React from 'react';
import { useState } from 'react';
import ProfilePage from '../pages/ProfilePage';
import padthai from './assets/padthai.jpg';
import pasta from './assets/pasta.webp';
import tacos from './assets/tacos.jpg';
import './assets/Profile.css';
import Popup from './Popup';
import './assets/viewRecipe.css';
import docreateRecipe from './CreateRecipe';
import houseIcon from './assets/houseIcon.png';
import lookup from './assets/lookup.png';
import postIcon from './assets/postIcon.png';
import profileIcon from './assets/profileIcon.png'
import food from './assets/addPictureIcon.jpg'
//import Popuprecipe from './popup-recipe';



function Profile() {


  var username = "username-example";
  const numRecipes = 3;
  const numFollowers = 5;
  const numFollowing = 10;
  var bio = "This is a bio. It is very cool and says words";
  var email = "email-example@gmail.com";
  var currentID = 0;

  // recipe items
  var recipe_id = [0, 1, 2]
  var recipeNames = ["Pad Thai", "Pasta", "Tacos"];
  var recipeUsers = ["user1", "user2", "user3"];
  var ingredients = ["2 ounces gin \n 1 ounce lemon juice, freshly squeezed \n3/4 ounce simple syrup \n1 egg white (about 1/2 ounce) \nClub soda, to top (about word word 2 ounces gin \n 1 ounce lemon juice, freshly squeezed \n3/4 ounce simple syrup \n1 egg white (about 1/2 ounce) \nClub soda, to top (about word word 2 ounces gin \n 1 ounce lemon juice, freshly squeezed \n3/4 ounce simple syrup \n1 egg white (about 1/2 ounce) \nClub soda, to top (about word word 2 ounces gin", "1 ounce lemon juice, freshly squeezed \n3/4 ounce simple syrup \n1 egg white (about 1/2 ounce) \nClub soda, to top (about word word 2 ounces gin" ,"1 ounce lemon juice, freshly squeezed \n3/4 ounce simple syrup \n1 egg white (about 1/2 ounce) \nClub soda, to top (about word word"];
  var directions = ["Add the gin, lemon juice, simple syrup and egg white to a shaker and vigorously dry-shake (without ice) for about 15 seconds.\nAdd 3 or 4 ice cubes and shake vigorously until well-chilled.\nDouble-strain into a chilled Collins glass and top with club soda. 2 ounces gin \n 1 ounce lemon juice, freshly squeezed \n3/4 ounce simple syrup \n1 egg white (about 1/2 ounce) \nClub soda, to top (about word word 2 ounces gin \n 1 ounce lemon juice, freshly squeezed \n3/4 ounce simple syrup \n1 egg white (about 1/2 ounce) \nClub soda, to top (about word word 2 ounces gin \n 1 ounce lemon juice, freshly squeezed ", "3/4 ounce simple syrup \n1 egg white (about 1/2 ounce) \nClub soda, to top (about word word2 ounces gin \n 1 ounce lemon juice, freshly squeezed \n3/4 ounce simple syrup", "1 egg white (about 1/2 ounce) \nClub soda, to top (about word word"];
  
  
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = React.useState("");
  const[isRecipePopUP, setIsRecipePopUP] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const togglerecipePopup = () => {
    setIsRecipePopUP(!isRecipePopUP);
  }
  
  const handlerecipeClick = (ID) => {
    currentID = ID;
    return(togglerecipePopup)
  }

  const doEditProfile = async event => {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let bio = document.getElementById("bio").value;

    // fix
    var obj = {
      //UserID: cookies.id, 
      Username: username, 
      Bio: bio, 
    }

    var js = JSON.stringify(obj);
    try
      {    
        const response = await fetch('http://localhost:5000/api/update_user', { mode: 'cors' },
            {method:'PATCH',body:js,headers:{'Content-Type': 'application/json'}});
        var stringified = JSON.stringify(await response.text()); 
        var res = JSON.parse(stringified);

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
                {recipe_id.map( ID => <li><img src={pasta} alt="" onClick={handlerecipeClick(ID)}/>{
                    
                    <div class="overlay">
                      <span className='recipe-title-profile'>{recipeNames[ID]}</span>
                      <span className='recipe-author-profile'>{recipeUsers[ID]}</span>
                    </div>
                  
              }</li>)}
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
                        <li><div className="name-text">Username<input type="name" name="Username" cols="79" maxlength="79" placeholder={username} ></input></div></li>
                        <li><div className="name-text">Email<input type="email" name="Email" cols="79" maxlength="79" placeholder={email}></input></div></li>
                        <li><div className="name-text">Bio<textarea type="bio" name="Bio" className="large-box" rows="3" cols="79" placeholder={bio}></textarea></div></li>

                        <div className="bottom-container">
                          <div className="button-container">
                            <button className="button-save" href="./profile" onClick={null} >Save</button>
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
              recipeName = {recipeNames[currentID]} 
              recipeUser = {recipeUsers[currentID]} 
              ingredients = {ingredients[currentID]}
              directions = {directions[currentID]}
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
                            <button className="button-recipe-delete"  onClick={null} >Delete</button>
                            <button className="button-recipe-delete"  onClick={null} >Edit</button>
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
 
