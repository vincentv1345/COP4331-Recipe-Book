import React from 'react';
import { useState } from 'react';
import ProfilePage from '../pages/ProfilePage';
import './assets/Profile.css';

function ProfilePage()
{
  console.log("In profile function");
  var username;
  var numRecipes;
  var numFollowers;
  var numFollowing;

  // profile pic, username, num recipes, num followers, num following, bio
  // edit profile button
  return(
    <title>Cookbook</title>,
    <div className="Profile">
      <button type="edit-profile-button" name="Submit" className="button" onClick={null} > Edit Profile </button>
    </div>
  )
}