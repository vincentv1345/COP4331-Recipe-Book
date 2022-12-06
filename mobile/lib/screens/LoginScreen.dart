import 'package:flutter/material.dart';
import 'package:mobile/screens/CreateAccount.dart';
import 'package:mobile/screens/HomeScreen.dart';
import 'package:mobile/screens/ViewRecipe.dart';
import 'package:mobile/utils/getAPI.dart';

import 'dart:convert';

String message = "", newMessageText = ''; //error messages

String loginName = '', password = '';



class GlobalData
{
  static String userId = '';
  static String firstName = '';
  static String lastName = '';
  static String loginName = '';
  static String password = '';

  static int recipesCount = 0;
  static int followers = 0;
  static int following = 0;
  static String bio = ''; //50 CHAR LIMIT
}


class LoginScreen extends StatefulWidget {

  const LoginScreen({Key? key}) : super(key: key);
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
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
          image: DecorationImage(image: AssetImage("lib/assets/loginbg.PNG"), fit: BoxFit.cover),
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
                  Row( //WELCOME TO

                    mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                          margin: const EdgeInsets.only(top: 350),
                        child: Text('Welcome to',style: TextStyle(fontSize: 30 ,color:Colors.black))
                      ),
                    ],
                  ), //Welcome to
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
                        margin: const EdgeInsets.only(top: 60),
                      child: Text('$message',style: TextStyle(fontSize: 18 ,color:Colors.black)),
                      )
                    ],
                  ), //ERROR MSG
                  Row(
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
                                fillColor: Color(0xecb19d7e),
                                labelText: 'Username',
                                hintText: 'Enter Your Username',
                                labelStyle: TextStyle(color: Colors.white),

                            ),
                            onChanged: (text) {
                              loginName = text;
                            },
                          ),
                        ),
                      ]
                  ), //USERNAME
                  Row(
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
                                fillColor: Color(0xecb19d7e),
                            //    border: OutlineInputBorder(),
                                border: InputBorder.none,
                                labelText: 'Password',
                                hintText: 'Enter Your Password',
                                labelStyle: TextStyle(color: Colors.white),

                            ),
                            onChanged: (text) {
                              password = text;
                            },

                          ),
                        ),
                      ]
                  ), //PASSWORD
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        margin: const EdgeInsets.only(top: 15),
                        width: 350,
                        child:
                        MaterialButton(

                          child: Text('Login',style: TextStyle(fontSize: 25 ,color:Color(0xffFEEACB))),
                          onPressed: () async
                          {
                            newMessageText = "";
                            changeText();
                            var userId = "";


                            try
                            {

                              var jsonObject = await RecipeData.login(loginName.trim(), password.trim());

                              //test later
                              print("RESULTS" + jsonObject.toString());
                              userId = jsonObject["id"];
                              print("ndfkns" + userId);
                              print(userId);
                              GlobalData.userId = userId; //do these work?
                              GlobalData.loginName = loginName;

                              GlobalData.password = password;
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => HomeScreen()),
                              );

                            }
                            catch(e)
                            {
                              newMessageText = "Incorrect Username or Password";
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
                      const Text('Don\'t have an account?'),
                      TextButton(
                        child: const Text(
                          'Create One',
                          style: TextStyle(fontSize: 20, color: Color(0xff5F2829)),
                        ),
                        onPressed: () {
                          //signup screen
                          Navigator.of(context).push(MaterialPageRoute(
                              builder: (context) => CreateScreen()));

                        },)
                        ],
                  ),


                  Row(
                    children: <Widget>[
                      MaterialButton(
                          child: Text('recipe',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                          onPressed: ()
                          {
                            // Navigator.pushNamed(context, '/profile');
                            Navigator.push(context, new MaterialPageRoute(
                                builder: (context) => new RecipeScreen())
                            );
                          },
                          color:Colors.brown[50],
                          textColor: Colors.black,
                          padding: EdgeInsets.all(2.0),
                          splashColor: Colors.grey[100]
                      )
                    ],
                  ),



                  //CREATE ACC
                  ],
              )
          )
    );
  }

}
















