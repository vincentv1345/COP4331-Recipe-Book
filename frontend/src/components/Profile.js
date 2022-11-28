import React from 'react';
import { useState } from 'react';
import ProfilePage from '../pages/ProfilePage';
import padthai from './assets/padthai.jpg';
import pasta from './assets/pasta.webp';
import tacos from './assets/tacos.jpg';
import './assets/Profile.css';
import Popup from './Popup';
import docreateRecipe from './CreateRecipe';





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
      <header className="App-header">
        <div class="circle"></div>
        <div class="recipes-text"> {numRecipes} recipes</div>
        <div class="username-text"> {username}</div>
        <div class="followers-text"> {numFollowers} followers</div>
        <div class="following-text"> {numFollowing} following</div>
        <div class="bio-text"> {bio}</div>
        <hr></hr>
        <div class="container">
          <ul class="image-gallery">
            <li>
              <img src={padthai}  alt="" />
              <div class="overlay">
                <span className='recipe-title'>{recipeNames[0]}</span>
                <span className='recipe-author'>{recipeUsers[0]}</span>
              </div>
            </li>
            <li>
              <img src={tacos}  alt="" />
              <div class="overlay">
                <span className='recipe-title'>{recipeNames[1]}</span>
                <span className='recipe-author'>{recipeUsers[1]}</span> 
              </div>
            </li>
            <li>
              <img src={pasta}  alt="" />
              <div class="overlay">
                <span className='recipe-title'>{recipeNames[2]}</span>
                <span className='recipe-author'>{recipeUsers[2]}</span>
              </div>
            </li>
          </ul>
        </div>
        <div className = 'postButton'>
                        <input type= "button"  className = "button" value = "Edit Profile" onClick={togglePopup}></input>
                        {isOpen && <Popup
      content={<>
  
              <div>
                <div className = "in-box">
                  <img src = {pasta} className = "img-holder"></img>

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