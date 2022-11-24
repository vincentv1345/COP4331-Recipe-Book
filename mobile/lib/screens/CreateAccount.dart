import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';

import 'HomeScreen.dart';

String message = "", newMessageText = ''; //error messages

String loginName = '', email = '', password = '';



class GlobalData
{
  static int userId = 0;
  static String firstName = '';
  static String lastName = '';
  static String loginName = '';
  static String password = '';
}


class CreateScreen extends StatefulWidget {
  @override
  _CreateScreenState createState() => _CreateScreenState();
}

class _CreateScreenState extends State<CreateScreen> {
  @override
  void initState() {
    super.initState();
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //   backgroundColor: Colors.blue,
      body: MainPage(),
    );
  }
}


class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {

  changeText() {
    setState(() {
      message = newMessageText;
    });
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: const BoxDecoration(
          image: DecorationImage(image: AssetImage("lib/assets/signupbg.PNG"), fit: BoxFit.cover),
        ),
        width:  MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child:
        SingleChildScrollView(
            child:

            Column(
              mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
              crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal

              children: <Widget>[
                Row( //Create

                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        margin: const EdgeInsets.only(top: 230),
                        child: Text('Create Account For',style: TextStyle(fontSize: 24 ,color:Colors.black))
                    ),
                  ],
                ), //Create
                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Text('Cookbook',style: TextStyle(fontSize: 60 ,color:Colors.black)),
                  ],
                ), //COOKBOOK
                Row( //ERROR MSG
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: <Widget>[
                    Container(
                      margin: const EdgeInsets.only(top: 0),
                      child: Text('$message',style: TextStyle(fontSize: 18 ,color:Colors.black)),
                    )
                  ],
                ), //ERROR MSG
                Row( //USERNAME
                    mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        margin: const EdgeInsets.only(top: 20),
                        width: 350,
                        child:
                        TextField (
                          obscureText: true,
                          style: TextStyle(fontSize: 18, color: Colors.white.withOpacity(1.0)),
                          decoration: const InputDecoration(
                            filled: true,
                            fillColor: Color(0xecBC93A2),
                            //    border: OutlineInputBorder(),
                            border: InputBorder.none,
                            labelText: 'Username',
                            hintText: 'Enter a username',
                            labelStyle: TextStyle(color: Colors.white),

                          ),
                          onChanged: (text) {
                            loginName = text;
                          },
                        ),
                      ),
                    ]
                ),
                Row( //EMAIL
                    mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        margin: const EdgeInsets.only(top: 15),
                        width: 350,
                        child:
                        TextField (
                          style: TextStyle(fontSize: 18, color: Colors.white.withOpacity(1.0)),
                          decoration: const InputDecoration(
                            filled: true,
                            border: InputBorder.none,
                            fillColor: Color(0xecBC93A2),
                            labelText: 'Email',
                            hintText: 'Enter a valid Email',
                            labelStyle: TextStyle(color: Colors.white),

                          ),
                          onChanged: (text) {
                            email = text;
                          },
                        ),
                      ),
                    ]
                ), //EMAIL
                Row( //PASS
                    mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        margin: const EdgeInsets.only(top: 20),
                        width: 350,
                        child:
                        TextField (
                          obscureText: true,
                          style: TextStyle(fontSize: 18, color: Colors.white.withOpacity(1.0)),
                          decoration: const InputDecoration(
                            filled: true,
                            fillColor: Color(0xecBC93A2),
                            //    border: OutlineInputBorder(),
                            border: InputBorder.none,
                            labelText: 'Password',
                            hintText: 'Enter a password',
                            labelStyle: TextStyle(color: Colors.white),

                          ),
                          onChanged: (text) {
                            password = text;
                          },

                        ),
                      ),
                    ]
                ), //PASSWORD
                Row( //BUTTON
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      margin: const EdgeInsets.only(top: 15),
                      width: 300,
                      child:
                      MaterialButton(


                      child: Text('Sign Up',style: TextStyle(fontSize: 20 ,color:Color(0xffF9DEE8))
                      ),


                          onPressed: () async
                          {
                            newMessageText = "";
                            changeText();
                            //add username to payload
                        //   String payload = '{"login":"' + loginName.trim() + '","password":"' + password.trim() + '"}';
                          //  var data = {"login": loginName ,"password": password};
                            var userId = -1;
                            var jsonObject;

                            try
                            {

                              //CHECK to make sure that username is > 0 and other requirements here!!!!!


                              String url = 'https://cop4331-10.herokuapp.com/api/create_user'; //http://www.flavordaddy.xyz/
                              String ret = await RecipeData.signup(loginName.trim(), email.trim(), password.trim());
                              jsonObject = json.decode(ret);
                              userId = jsonObject["id"];

                              GlobalData.userId = userId;
                              // GlobalData.firstName = jsonObject["firstName"];
                              // GlobalData.lastName = jsonObject["lastName"];
                              GlobalData.loginName = loginName;
                              GlobalData.password = password;
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => HomeScreen()),
                              );
                            }
                            catch(e)
                            {
                              newMessageText = "Incorrect Email or Password";
                              changeText();
                            }
                          },

                          color:const Color(0xff5F2829),
                          shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22.0) ),
                          textColor: Color(0xffF9DEE8),
                          padding: EdgeInsets.all(2.0),
                          splashColor: Colors.black
                      ),
                    )
                  ],
                ), //BUTTON
                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: <Widget>[
                    TextButton(
                      child: const Text(
                        'Log in',
                        style: TextStyle(fontSize: 20, color: Color(0xff5F2829)),
                      ),
                      onPressed: () {
                        //signup screen
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => LoginScreen()));
                      },)
                  ],
                ) //CREATE ACC

              ],
            )
        )
    );
  }




}
