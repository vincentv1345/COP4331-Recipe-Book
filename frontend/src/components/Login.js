import React from 'react';
import { useState } from 'react';
import cookbook from './assets/cookbook.png';
import './assets/Login.css';

function Login()
{
    var username;
    var pass;
    const [message,setMessage] = useState('');
    
    const doLogin = async event => 
    {
        event.preventDefault();
        var obj = {Username: username,Password: pass};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch('https://recipebook5959.herokuapp.com/api/login', { mode: 'cors' }, {
              method: 'POST',
              body: js,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
          var stringified = JSON.stringify(await response.text()); 
          var res = JSON.parse(stringified);
          
          if( res.id <= 0 )
          {
            setMessage('User/Password combination incorrect');
          } 
          else
          {
            var user = {id: res.id}
            localStorage.setItem('user_data', JSON.stringify(user));
            setMessage('');
            // window.location.href = '/Login';
          }
        }

        catch(e)
        {
          alert(e.toString());
          
          return;
        }    
    };

    return (
      <title>Cookbook</title>,
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
            <ul className="list">
              <li><input type="username" name="username" placeholder="Username"></input></li>
              <li><input type="password" name="pass" placeholder="Password"></input></li>
              <li><button type="button" name="Submit" class="button" onClick={doLogin} >Login</button></li>
              
            </ul>
            <div className="small-text">
              Don't have an account?
              <a className="App-link" href="./SignUp" target="_blank">
                Create one
              </a>
            </div>
          </div>
        </header>
      </div>
    );
};
export default Login;