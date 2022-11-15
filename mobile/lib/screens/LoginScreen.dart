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


class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
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


  /* Two Buttons Example
  @override
  Widget build(BuildContext context) {
    return Container(
        child:
            Column(
              children: [
                MaterialButton(
                    child: Text('Do Login',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                    onPressed: ()
                    {
                      Navigator.pushNamed(context, '/cards');
                    },
                    color:Colors.brown[50],
                    textColor: Colors.black,
                    padding: EdgeInsets.all(2.0),
                    splashColor: Colors.grey[100]
                ),
                MaterialButton(
                    child: Text('To Login',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                    onPressed: ()
                    {
                      Navigator.pushNamed(context, '/login');
                    },
                    color:Colors.brown[50],
                    textColor: Colors.black,
                    padding: EdgeInsets.all(2.0),
                    splashColor: Colors.grey[100]
                )






              ],
            )

    );
  }
*/

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
                          margin: const EdgeInsets.only(top: 255),
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
                        margin: const EdgeInsets.only(top: 120),
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
                                labelText: 'Email',
                                hintText: 'Enter Your Email',
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

                          child: Text('ENTER',style: TextStyle(fontSize: 20 ,color:Color(0xffFEEACB))),
                          onPressed: () async
                          {
                            newMessageText = "";
                            changeText();

                            String payload = '{"login":"' + loginName.trim() + '","password":"' + password.trim() + '"}';
                            var userId = -1;
                            var jsonObject;

                            try
                            {
                              String url = 'https://cop4331-10.herokuapp.com/api/login'; //http://www.flavordaddy.xyz/
                              String ret = await CardsData.getJson(url, payload);
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
                          textColor: Color(0xffFEEACB),
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
                      Container(
                        margin: const EdgeInsets.only(top: 10),
                        child:
                      Text('Don\'t have an account? Create One',style: TextStyle(fontSize: 15 ,color: Color(0xff5F2829))),
                      )
                        ],
                  ) //CREATE ACC
                  ],
              )
          )
    );
  }




}
















