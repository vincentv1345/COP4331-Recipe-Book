import React from 'react';
import { useState } from 'react';
import cookbook from './assets/cookbook.png';
import './assets/Login.css';

function Login()
{
 
  //COMMENT OUT when running locally
  // console.log("In login function");
  //   const app_name = 'recipebook5959';
  //   function buildPath(route)
  //   {
  //       if (process.env.NODE_ENV === 'production') 
  //       {
  //           console.log("CHECK: In Heroku server");
  //           return 'https://' + app_name +  '.herokuapp.com/' + route;
  //       }
  //       else
  //       {       
  //           console.log("CHECK: In local server"); 
  //           return 'http://localhost:5000/' + route;
  //       }
  //   }
    

    var username, password, bio, email, following, verified;
    const [message,setMessage] = useState('');
    //const [cookies, setCookie] = useCookies(["user"]);
    
    const doLogin = async event => 
    {
        event.preventDefault();
        var obj = {Username: username.value,Password: password.value};
        console.log("username.value: " + username.value + " pass.value: " + password.value);
        var js = JSON.stringify(obj);
        console.log("js: " + js);

        let response;

        try
        {    
          //COMMENT OUT when running through HEROKU
          // const response = await fetch(buildPath('api/login'), 
          // {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          // UNCOMMENT OUT when running locally
          response = await fetch('http://localhost:5000/api/login',
          {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        
          console.log("In login try");
          var res;
          try{
             res = JSON.parse(await response.text());
          } 
          catch(e)
          {
            console.log(e);
          }

          console.log("res " + JSON.stringify(res));

          if( res.id <= 0 )
          {
            setMessage('User/Password combination incorrect');
          } 
          else
          {
            var user = {id: res.id};
            username = {Username: res.Username};
            bio = {Bio: res.Bio};
            email = {Email: res.Email};
            following = {Following: res.Following};
            verified = {Verified: res.Verified};
            localStorage.setItem('user_data', JSON.stringify(user));
            setMessage('');
            console.log("Found user");
            
            localStorage.setItem('username_data', JSON.stringify(username));
            localStorage.setItem('bio_data', JSON.stringify(bio));
            localStorage.setItem('email_data', JSON.stringify(email));
            localStorage.setItem('following_data', JSON.stringify(following));
            localStorage.setItem('verified_data', JSON.stringify(verified));
            localStorage.setItem('email_data', JSON.stringify(email));

            let data = localStorage.getItem('username_data');
            console.log(data);
            // if(ifverified == "true")
            // {
            //   window.location.href = '/homepage';
            // }
            // else if(ifverified == "false")
            // {
            //   console.log("User is not verified");
            // }
            // else
            // {
            //   console.log("You should not be here");
            // }
            
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
            <ul className="list">
              <li><input type="username" name="username" placeholder="Username" ref={(c) => username = c}></input></li>
              <li><input type="password" name="pass" placeholder="Password" ref={(c) => password = c}></input></li>
              <li><button type="button" name="Submit" className="button" onClick={doLogin} >Login</button></li>
            </ul>
            <div className="small-text">
              Don't have an account?
              <a className="App-link" href="./SignUp">
                 Create one
              </a>
              <div>
                <a className="App-link" href="./ForgotPassword">Forgot Password?</a>
              </div>
            </div>
          </div>
        </header>
      </div>
    );

};
export default Login;