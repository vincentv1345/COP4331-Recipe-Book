import React from 'react';
import { useState } from 'react';
import cookbook from './assets/cookbook.png';
import houseIcon from './assets/houseIcon.png';
import lookup from './assets/lookup.png';
import postIcon from './assets/postIcon.png';
import profileIcon from './assets/profileIcon.png'
import './assets/homepage.css';
import docreateRecipe from './CreateRecipe';
import Popup from './Popup';
import food from './assets/addPictureIcon.jpg';
import padthai from './assets/padthai.jpg';
import pasta from './assets/pasta.webp';
import tacos from './assets/tacos.jpg';
import './assets/CreateRecipe.css';
import { MdClose } from "react-icons/md";

function HomePage() {
  /*profileButton = document.createElement("button");
  profileButton.innerHTML = '<img src="https://www.pngwing.com/en/free-png-nlvhq" />'
  profileButton.onclick = function () {
      //CHANGE THE LOCATION TO ACTUAL PAGE
      location.href = "www.flavordaddy.xyz";
  }

  let addPostButton = document.createElement("button");
  addPostButton.innerHTML = '<img src="https://www.pngwing.com/en/free-png-nlvhq" />'
  */


  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

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
  }


  return (
    <body>
      <header className="App-header">
        <div className='NavigationBar'>
          <h1 className="Header-link" id="title">
            <a>Cookbook</a>
            <img src={houseIcon} className="App-logoHome" alt="logo" />
          </h1>
          <div className='SearchBar' id="search">
            <input type="text" className="SearchBar-Textbox" cols="79" maxlength="79" placeholder="Search" ></input>
          </div>
          <div className='SearchBar-postButton'>
            <input type="image" src={lookup} className="mag-img"></input>
          </div>




          <div className='postButton'>
          <input type="image" src={postIcon} className="post-img" onClick={togglePopup}></input>
          {isOpen && <Popup
            content={<>

              <div>
                <div className="in-box">
                  <img src={food} className="img-holder"></img>

                  <div className="text-area">
                    <ul className="list-create">
                      <li><div className="name-text">Name<input type="name" name="name" cols="79" maxlength="79" placeholder="Like 'Delicious Recipe'" ></input></div></li>
                      <li><textarea type="ingredients" name="ingredients" className="large-box" rows="3" cols="79" placeholder="Write your ingredients here." ></textarea></li>
                      <li><textarea type="description" name="description" className="large-box" rows="3" cols="79" placeholder="Write your directions here." ></textarea></li>
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
                  <button className="button-create" onClick={docreateRecipe} >Create</button>
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
        <div class="container">
          <ul class="image-gallery">
            <li>
              <img src={padthai} alt="" />
              <div class="overlay">
                <span className='recipe-title'>Pad Thai</span>
                <span className='recipe-author'>username</span>
              </div>
            </li>
            <li>
              <img src={tacos} alt="" />
              <div class="overlay">
                <span className='recipe-title'>Tacos</span>
                <span className='recipe-author'>username</span>

              </div>
            </li>
            <li>
              <img src={pasta} alt="" />
              <div class="overlay">
                <span className='recipe-title'>Pasta</span>
                <span className='recipe-author'>username</span>
              </div>
            </li>
          </ul>
        </div>


    </header>
      </body >
    );
};
export default HomePage;