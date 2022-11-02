import React from 'react';
import { useState } from 'react';
import cookbook from './assets/cookbook.png';
import './assets/Login.css';

function Login()
{
    var Username;
    var Password;
    const [message,setMessage] = useState('');
    
    const doLogin = async event => 
    {
        event.preventDefault();
        var obj = {Username:Username.value,Password:Password.value};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch('http://localhost:4000/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
          if( res.id <= 0 )
          {
            setMessage('User/Password combination incorrect');
          } 
          else
          {
            var user = 
            {firstName:res.firstName,lastName:res.lastName,id:res.id}
            localStorage.setItem('user_data', JSON.stringify(user));
            setMessage('');
              window.location.href = '/cards';
          }
        }
        catch(e)
        {
          alert(e.toString());
          
          return;
        }    
    };
    // return(
    //   <div id="loginDiv">
    //     <form onSubmit={doLogin}>
    //     <span id="inner-title">PLEASE LOG IN</span><br />
    //     <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
    //     <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
    //     <input type="submit" id="loginButton" class="buttons" value = "Do It"
    //       onClick={doLogin} />
    //     </form>
    //     <span id="loginResult">{"message"}</span>
    //  </div>
    // );

    return (
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
              <li><input type="user" name="User" placeholder="User Name"></input></li>
              <li><input type="password" name="Password" placeholder="Password"></input></li>
              <li><button type="button" name="Submit" class="button" onClick={doLogin} >Login</button></li>
              
            </ul>
            <div className="small-text">
              Don't have an account?
              <a className="App-link" href="" target="_blank">
                Create one
              </a>
            </div>
          </div>
        </header>
      </div>
    );
};
export default Login;