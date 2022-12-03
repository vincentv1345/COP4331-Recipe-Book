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




  function Profile(){
    

    const username = "username-example";
    const numRecipes = 3;
    const numFollowers = 5;
    const numFollowing = 10;
    const bio = "This is a bio. It is very cool and says words";
    const email = "email-example@gmail.com";
    const recipeNames= ["Pad Thai","Pasta","Tacos"];
    const recipeUsers= ["user1","user2","user3"];
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
 
  // profile pic, username, num recipes, num followers, num following, bio
  // edit profile button
  return(
    <title>Cookbook</title>,
    <body>
    <div className="Profile" id = "welcome">
      <header className="App-header-profile">
      <header className = "App-header-profile-nav-bar">
                <div className='NavigationBar'>
                    <h1 className = "Header-link-nav-bar" id="title">
                        <a>Cookbook</a>
                        

                    </h1>
                    <div classname = "App-logoHome-profile">
                      <a href = "./homepage">
                      <input type = "image" src={houseIcon} className="App-logoHome-profile" alt="logo" ></input>
                    </a>
                    </div>
                    <div className = 'SearchBar-nav-bar' id = "search">
                        <input type="text" className = "SearchBar-Textbox-nav-bar" cols ="79" maxlength="79" placeholder="Search" ></input>
                    </div>
                    <div className = 'SearchBar-postButton-nav-bar'>
                        <input type="image" src= {lookup} className = "mag-img-nav-bar"></input> 
                    </div>
                    <div className = 'postButton-nav-bar'>
                        <input type= "image" src ={postIcon} className = "post-img-nav-bar" ></input>

                    </div>
                    <div className = 'profileButton-nav-bar'>
                        <input type = "image" src = {profileIcon} className = "profile-img-nav-bar"></input>
                    </div>
                    <div id = "horizontal-line-nav-bar"></div>

                    

                </div>
            </header>

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
              <img src={padthai}  alt="" />
              <div class="overlay">
                <span className='recipe-title-profile'>{recipeNames[0]}</span>
                <span className='recipe-author-profile'>{recipeUsers[0]}</span>
              </div>
            </li>
            <li>
              <img src={tacos}  alt="" />
              <div class="overlay">
                <span className='recipe-title-profile'>{recipeNames[1]}</span>
                <span className='recipe-author-profile'>{recipeUsers[1]}</span> 
              </div>
            </li>
            <li>
              <img src={pasta}  alt="" />
              <div class="overlay">
                <span className='recipe-title-profile'>{recipeNames[2]}</span>
                <span className='recipe-author-profile'>{recipeUsers[2]}</span>
              </div>
            </li>
          </ul>
        </div>
        </div>
        <div>
                        <input type= "button"  className = "button-edit-profile" value = "Edit Profile" onClick={togglePopup}></input>
                        {isOpen && <Popup
      content={<>
  
              <div>
                <div className = "in-box">
                  <img src = {food} className = "img-holder"></img>

                  <div className="text-area">
                    <ul className="list-create">
                      <li><div className ="name-text">Username<input type="name" name="Username" cols ="79" maxlength="79" placeholder={username} ></input></div></li>
                      <li><div className ="name-text">Email<input type="email" name="email"  cols ="79" maxlength="79" placeholder={email}></input></div></li>
                      <li><div className ="name-text">Bio<textarea type="bio" name="bio" className ="large-box" rows="3" cols="79" placeholder={bio}></textarea></div></li>
                      
                    </ul>

                    <div className="bottom-container">

                      
                      <div className="button-container">
                        <button className="button-create" href="./profile" onClick={null} >Save</button>
                      </div>
                    </div>

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
}

export default Profile;