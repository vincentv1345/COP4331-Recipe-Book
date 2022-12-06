import React from 'react';
import { useState } from 'react';
import ProfilePage from '../pages/ProfilePage';
import padthai from './assets/padthai.jpg';
import pasta from './assets/pasta.webp';
import tacos from './assets/tacos.jpg';
import './assets/Profile.css';
import Popup from './Popup';
import docreateRecipe from './CreateRecipe';
import houseIcon from './assets/houseIcon.png';
import lookup from './assets/lookup.png';
import postIcon from './assets/postIcon.png';
import profileIcon from './assets/profileIcon.png'
import food from './assets/addPictureIcon.jpg'


function Profile() {
  // var username = cookies.Username;
  var username = "example-username";
  const numRecipes = 3;
  const numFollowers = 5;
  const numFollowing = 10;
  var bio = "";
  const recipeNames = ["Pad Thai", "Pasta", "Tacos"];
  const recipeUsers = ["user1", "user2", "user3"];
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = React.useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
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

        var res;
        try {
          res = JSON.parse(await response.text());
        }
        catch(e)
        {
          console.log(e);
        }
      }
      catch(e)
      {
        alert(e.toString());
        console.log("Failed to get API call. response" + res);
        return;
      }
  };

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
                <li>
                  <img src={padthai} alt="" />
                  <div class="overlay">
                    <span className='recipe-title-profile'>{recipeNames[0]}</span>
                  </div>
                </li>
                <li>
                  <img src={tacos} alt="" />
                  <div class="overlay">
                    <span className='recipe-title-profile'>{recipeNames[1]}</span>
                  </div>
                </li>
                <li>
                  <img src={pasta} alt="" />
                  <div class="overlay">
                    <span className='recipe-title-profile'>{recipeNames[2]}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <input type="button" className="button-edit-profile" value="Edit Profile" onClick={togglePopup}></input>
                <div>
                <a href = './'>
                 <button className = 'logoutButton' type = "button" onClick={('./')}>Logout</button>
                </a>
              </div>
            {isOpen && <Popup
              content={<>

                <div>
                  <div className="in-box">
                    <img src={food} className="img-holder"></img>

                    <div className="text-area">
                      <ul className="list-create">
                        <li><div className="name-text">Username<input id="username" type="name" name="Username" cols="79" maxlength="79" placeholder={username} ref={(c) => username = c}></input></div></li>
                        <li><div className="name-text">Bio<textarea id="bio" type="bio" name="Bio" className="large-box" rows="3" cols="79" placeholder={bio} ref={(c) => bio = c}></textarea></div></li>

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
          </div>
        </header>
      </div>
    </body>
  )
};

export default Profile;