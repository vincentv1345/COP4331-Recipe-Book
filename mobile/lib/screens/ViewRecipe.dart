import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';


import '../main.dart';
import 'AddScreen.dart';
import 'CreateAccount.dart';
import 'HomeScreen.dart';
import 'Profile.dart';

String message = "help", newMessageText = ''; //error messages
String loginName = '', email = '', password = '';


class RecipeScreen extends StatefulWidget {
  @override
  _RecipeScreenState createState() => _RecipeScreenState();
}

class _RecipeScreenState extends State<RecipeScreen> {
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

 // late final List<ListItem> items;


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
        padding: EdgeInsets.fromLTRB(20, 0, 20, 0),
        decoration: const BoxDecoration(
          image: DecorationImage(image: AssetImage("lib/assets/homescreen.png"), fit: BoxFit.cover),
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

            Container(
            margin: const EdgeInsets.only(top: 50, left: 10,),

            child:
            Row(
              children: <Widget>[

                Column(
                    children:<Widget>[

                      const SizedBox(width: 16),

                      FloatingActionButton.small(
                        backgroundColor: Color(0xff5F2829),
                        onPressed: () {
                          Navigator.push(context, new MaterialPageRoute(
                              builder: (context) => new HomeScreen())
                          );
                        },
                        child: const Icon(Icons.home),
                      ),
                    ]
                ),



                Column(
                    children:<Widget>[

                      const SizedBox(width: 16),

                      FloatingActionButton.small(
                        backgroundColor: Color(0xff5F2829),
                        onPressed: () {
                          Navigator.push(context, new MaterialPageRoute(
                              builder: (context) => new AddScreen())
                          );
                        },
                        child: const Icon(Icons.add),
                      ),
                    ]
                ),


                Column(
                    children:<Widget>[

                      const SizedBox(width: 16),

                      FloatingActionButton.small(
                        backgroundColor: Color(0xff5F2829),
                        onPressed: () {
                          Navigator.push(context, new MaterialPageRoute(
                              builder: (context) => new ProfileScreen())
                          );
                        },
                        child: const Icon(Icons.person),
                      ),
                    ]
                ),


             /*   Container(
                      margin: const EdgeInsets.only(top: 0, left: 50),
                      width: 125,
                      child:
                      MaterialButton(
                          child: Text('Favorite',style: TextStyle(fontSize: 20 ,color: Colors.white, )
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

                          color: const Color(0xff5F2829),
                          shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22.0) ),
                          textColor: Colors.white,
                          padding: EdgeInsets.all(2.0),
                          splashColor: Colors.black
                      ),
                    ),
*/
                  ],
                ), //buttons
            ),






                Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[

                      Container(
                        padding: EdgeInsets.all(15), // Border width
                        decoration: BoxDecoration(color: Colors.transparent,),
                          margin: const EdgeInsets.only(top: 5),
                          width: MediaQuery.of(context).size.width - 50,
                          height: 300,

                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(8.0),

                            child: Image.asset(
                              "lib/assets/food.jpg",
                              width: 600.0,
                              height: 240.0,
                              fit: BoxFit.cover,
                            ),
                          )
                      )
                    ]
                ), //IMAGE //NAME

                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Text(currentRecipe.recipeName,style: TextStyle(fontSize: 30 ,fontWeight:FontWeight.bold,color:Colors.black)),
                  ],
                ), //NAME


                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        margin: const EdgeInsets.only(top: 35, right: 200, bottom: 5),
                        child:
                        Text('Ingredients',
                            style: TextStyle(fontSize: 25 ,color:Colors.black))
                    ),
                  ],
                ),


                Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,

                    children: <Widget>[
                      Container(

                       // color: Colors.white,
                        child: Expanded(
                        flex: 1,


                        child: SingleChildScrollView(
                          scrollDirection: Axis.vertical,

                          child: Text(
                            currentRecipe.recipeIngredients,
                            style: const TextStyle(
                              fontSize: 16.0, color: Colors.black),
                          ),
                        ),
                      ),
                      ),
                    ]
                ),



                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        margin: const EdgeInsets.only(top: 35, right: 200, bottom: 5),
                        child:
                        const Text('Directions',
                            style: TextStyle(fontSize: 25 ,color:Colors.black))
                    ),
                  ],
                ),


                Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        // color: Colors.white,
                        child: Expanded(
                          flex: 1,
                          child: SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: Text(
                              currentRecipe.recipeDirections,
                              style: const TextStyle(
                                fontSize: 16.0, color: Colors.black, //backgroundColor: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ]
                ),









              ],
            )
        )
    );
  }





}

