import React from 'react';
import { useState } from 'react';
import cookbook from './assets/cookbook.png';
import './assets/Login.css';

function forgotPassword()
{
    var username;
    var password;
    const [message,setMessage] = useState('');
    
    // const doforgotPassword = async event => 
    // {
    //     event.preventDefault();
    // };

    return (
      <title>Cookbook | Login</title>,
      <div className="login">
        <header className="App-header">
          <div className='form-container'>
            <div className="img-text">
              <div>
              <img src={cookbook} className="App-logo" alt="logo" />
              </div>
              <div>
                Welcome to <div className="Title">Cookbook</div> 
              </div>
            </div>
            <div className="small-text">An Email will be sent out if valid and is already registered</div>
            <ul className="list">
              <li><input type="Email" name="Email" placeholder="Email-address" ></input></li>
              <li><button type="button" name="Submit" className="button" >Reset Password</button></li>
            </ul>
            <div className="small-text">
                Remember your password?
              <a className="App-link" href="./">
                Cancel
              </a>
            </div>
          </div>
        </header>
      </div>
    );

};
export default forgotPassword;