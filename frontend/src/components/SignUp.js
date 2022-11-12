import React from 'react';
import { useState } from 'react';
import cookbook from './assets/cookbook.png';
import './assets/SignUp.css';

function SignUp()
{
    var email;
    var username;
    var password;
    const [message,setMessage] = useState('');
    
    const doSignUp = async event => 
    {
        event.preventDefault();
        let obj = {Email:email,Username:username,Password:password};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch('https://recipebook5959.herokuapp.com/api/create_user', { mode: 'cors' },
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var stringified = JSON.stringify(await response.text()); 
            var res = JSON.parse(stringified);
          if( res.id <= 0 )
          {
            setMessage('User/Password combination incorrect');
          } 
          else
          {
            var user = 
            {id:res.id}
            localStorage.setItem('user_data', JSON.stringify(user));
            setMessage('');
          }
        }
        catch(e)
        {
          alert(e.toString());
          
          return;
        }    
    };
 
    return (
      <div className="SignUp">
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
            <ul className="list">
              <li><input type="Email" name="Email" placeholder="Email"></input></li>
              <li><input type="user" name="User" placeholder="User Name"></input></li>
              <li><input type="password" name="Password" placeholder="Password"></input></li>
              <li><button type="button" name="Submit" class="button" onClick={doSignUp} >SignUp</button></li>
              
            </ul>
            <div className="small-text">
              Already have an account?
              <a className="App-link" href="./login" >
                Log In
              </a>
            </div>
          </div>
        </header>
      </div>
    );
};
export default SignUp;