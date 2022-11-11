import React from 'react';
import { useState } from 'react';
import cookbook from './assets/cookbook.png';
import './assets/Login.css';

function Login()
{
  /*
  console.log("In login function");
    const app_name = 'recipebook5959';
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            console.log("CHECK: In Heroku server");
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {       
            console.log("CHECK: In local server"); 
            return 'http://localhost:4000/' + route;
        }
    }
    */

    var username;
    var password;
    const [message,setMessage] = useState('');
    
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
          /*
              console.log("Before try");
              response = await fetch('http://localhost:5000/api/login', { mode: 'cors' }, {  //buildPath('api/login') //https:recipebook5959.herokuapp.com
              method: 'POST',
              body: js,
              headers: {
                'Content-Type': 'application/json'
              }
              */
              response = await fetch('http://localhost:5000/api/login',
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          
            

            

          console.log("response: " + response);
          console.log("In login try");
          var res;
          try{
             res = JSON.parse(await response.text());
          } 
          catch(e)
          {
            console.log(e);
          }
          
          console.log("res " + res);

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
            console.log("unable to find user");
          }
        }

        catch(e)
        {
          alert(e.toString());
          console.log("Failed to get API call. response: " + response);
          return;
        }    
    };

    /*
    const [data, setData] = React.useState(null);

    
    React.useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
    

    return (
      <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
      </div>
      
    );
    */

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
              <li><input type="username" name="username" placeholder="Username" ref={(c) => username = c}></input></li>
              <li><input type="password" name="pass" placeholder="Password" ref={(c) => password = c}></input></li>
              <li><button type="button" name="Submit" className="button" onClick={doLogin} >Login</button></li>
              
            </ul>
            <div className="small-text">
              Don't have an account?
              <a className="App-link" href="./SignUp">
                Create one
              </a>
            </div>
          </div>
        </header>
      </div>
    );

};
export default Login;