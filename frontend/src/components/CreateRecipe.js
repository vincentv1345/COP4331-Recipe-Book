import React from 'react';
import { useState } from 'react';
import './assets/CreateRecipe.css';
import tacos from './assets/tacos.jpg';

function docreateRecipe()
{
  return (
        <title>Cookbook | Create Recipe</title>,
        <div className="Create">
          <header className="App-header">
            <div className='form-container-create'>
              <div>
                <div className = "in-box">
                  <img src = {tacos} className = "img-holder"></img>

                  <div className="text-area">
                    <ul className="list-create">
                      <li><div className ="name-text">Name<input type="name" name="name" cols ="79" maxlength="79" placeholder="Like 'Delicious Recipe'" ></input></div></li>
                      <li><textarea type="ingredients" name="ingredients" className ="large-box" rows="3" cols="79" placeholder="Write your ingredients here." ></textarea></li>
                      <li><textarea type="description" name="description" className ="large-box" rows="3" cols="79" placeholder="Write your directions here." ></textarea></li>
                    </ul>

                    <div className="bottom-container">
                      <div className="input-container">
                        <input type="text" className="input-tag" placeholder="Enter tags here."></input>
                        <button className="add-button">Add</button>
                      </div>
                      
                      <div className="button-container">
                        <button className="button-create" onClick={docreateRecipe} >Create</button>
                        <button className="button-cancel"  >Cancel</button>
                      </div>
                    </div>

                    <div className="tag-container">
                      <span className="tag">ya <span className="remove-tag">&#10006;</span></span>
                      <span className="tag">yaya <span className="remove-tag">&#10006;</span></span>
                      <span className="tag">yayaya <span className="remove-tag">&#10006;</span></span>
                    </div> 
                  </div>         
                </div>
              </div>
            </div>  
          </header>
        </div>
      );
  
  };
export default docreateRecipe;

// const button = document.querySelector('.add-button');
// const tagInput = document.querySelector('.input-tag');

// const form = document.forms[0];
// const tagContainer = document.querySelector('.tag-container');
// const tags = [];

// const createTag = (tagValue) => {
//   const value = tagValue.trim();

//   if(value === '' || tags.includes(value)) return;

//   const tag = document.createElement('span');
//   const tagContent = document.createTextNode(value);

//   tag.setAttribute('className', 'tag');
//   tag.appendChild(tagContent);

//   const close = document.createElement('span');
//   close.setAttribute('className', 'remove-tag');
//   close.innerHTML = '&#10006;';
//   close.onclick = handleRemoveTag;

//   tag.appendChild(close);
//   tagContainer.appendChild(tag);
//   tags.push(tag);

//   tagInput.value = '';
//   tagInput.focus();
// };

// const handleRemoveTag = (e) => {
//   const item = e.target.textContent;
//   e.target.parentElement.remove();
//   tags.splice(tags.indexOf(item), 1);
// }

// const handleFormSubmit = (e) => {
//   e.preventDefault();
//   createTag(tagInput.value);
// }

// form.addEventListener('submit', handleFormSubmit);