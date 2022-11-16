import 'package:flutter/material.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';

String message = "", newMessageText = ''; //error messages

String loginName = '', password = '';



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
                        margin: const EdgeInsets.only(top: 225),
                        child: Text('Create Account For',style: TextStyle(fontSize: 24 ,color:Colors.black))
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
                      margin: const EdgeInsets.only(top: 20),
                      child: Text('$message',style: TextStyle(fontSize: 18 ,color:Colors.black)),
                    )
                  ],
                ), //ERROR MSG
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
                            labelText: 'Username',
                            hintText: 'Enter a username',
                            labelStyle: TextStyle(color: Colors.white),

                          ),
                          onChanged: (text) {
                            password = text;
                          },
                        ),
                      ),
                    ]
                ),
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
                            labelText: 'Email',
                            hintText: 'Enter a valid Email',
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
                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      margin: const EdgeInsets.only(top: 15),
                      width: 300,
                      child:
                      MaterialButton(


                      child: Text('Sign Up',style: TextStyle(fontSize: 20 ,color:Color(0xffFEEACB))
                      ),


                          onPressed: () async
                          {
                            newMessageText = "";
                            changeText();
                            //add username to payload
                            String payload = '{"login":"' + loginName.trim() + '","password":"' + password.trim() + '"}';
                            var userId = -1;
                            var jsonObject;

                            try
                            {
                              String url = 'https://cop4331-10.herokuapp.com/api/'; //http://www.flavordaddy.xyz/
                              String ret = await RecipeData.getJson(url, payload);
                              jsonObject = json.decode(ret);
                              userId = jsonObject["id"];
                            }
                            catch(e)
                            {
                              //   newMessageText = e.message;
                              changeText();
                              //    return;
                            }
                            if( userId <= 0 )
                            {
                              newMessageText = "Incorrect Email or Password";
                              changeText();

                              //delete
                              Navigator.pushNamed(context, '/cards');
                            }
                            else
                            {
                              GlobalData.userId = userId;
                              // GlobalData.firstName = jsonObject["firstName"];
                              // GlobalData.lastName = jsonObject["lastName"];
                              GlobalData.loginName = loginName;
                              GlobalData.password = password;
                              Navigator.pushNamed(context, '/cards');
                            }
                          },

                          color:const Color(0xff5F2829),
                          shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22.0) ),
                          textColor: Color(0xffFEEACB),
                          padding: EdgeInsets.all(2.0),
                          splashColor: Colors.black
                      ),
                    )
                  ],
                ), //BUTTON
               /* Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: <Widget>[
                    const Text('Don\'t have an account?'),
                    TextButton(
                      child: const Text(
                        'Create One',
                        style: TextStyle(fontSize: 20),
                      ),
                      onPressed: () {
                        //signup screen
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => CreateScreen()));

                      },)
                  ],
                ) *///CREATE ACC
              ],
            )
        )
    );
  }




}
