import React from 'react';
import { useState } from 'react';
import cookbook from './assets/cookbook.png';
import './assets/SignUp.css';
import Popup from './Popup-signup.js';

function SignUp()
{
    var email;
    var username;
    var password;
    const [message,setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    
    const doSignUp = async event => 
    {
        // setIsOpen(!isOpen);
        event.preventDefault();
        let obj = {Email:email.value ,Username:username.value ,Password:password.value};
        var js = JSON.stringify(obj);

        let response;

        try
        {    
          // const response = await fetch(buildPath('api/create_user'), // took out { mode: 'cors' },
          // {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          
          // UNCOMMENT OUT when running locally
          response = await fetch('http://localhost:5000/api/create_user',
          {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          
          var res;
          
          try {
            res = JSON.parse(await response.text());
          }
          catch(e) {
            console.log(e);
          }

          console.log("res " + res);

          if( res.id <= 0 )
          {
            setMessage('User/Password combination incorrect');
          } 
          else
          {
            var user = {id:res.id}
            localStorage.setItem('user_data', JSON.stringify(user));
            
            setMessage('');
            window.location.href = '/';
          }
        }
        catch(e)
        {
          alert(e.toString());
          console.log("Failed to get API call. response: " + response);
          return;
        }    
    };
 
    return (
      <title>Cookbook | SignUp</title>,
      <div className="SignUp">
        <header className="App-header-log">
          <div className='form-container'>
            <div className="img-text">
              <div>
              <img src={cookbook} className="App-logo" alt="logo" />
              </div>
              <div>
                Welcome to <div className="Title">Cookbook</div> 
              </div>
            </div>
            <div className="small-text">An Email for verification will be sent</div>
            <ul className="list">
              <li><input type="Email" name="Email" placeholder="Email" ref={(c) => email = c}></input></li>
              <li><input type="user" name="User" placeholder="Username" ref={(c) => username = c}></input></li>
              <li><input type="password" name="Password" placeholder="Password" ref={(c) => password = c}></input></li>
              <li><button type="button" name="Submit" class="button" onClick={doSignUp} > SignUp</button></li> 
            </ul>
            <div className="small-text">
              Already have an account?
              <a className="App-link" href="./" >
                Log In
              </a>
            </div>
          </div>
        </header>
      </div>
    );
};
export default SignUp;