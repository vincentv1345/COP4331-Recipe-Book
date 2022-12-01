import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';

import '../main.dart';
import 'CreateAccount.dart';
import 'HomeScreen.dart';
import 'Profile.dart';

String message = "help", newMessageText = ''; //error messages
String loginName = '', email = '', password = '';

late final List<ListItem> items;


class GlobalData
{
  static int userId = 0;
  static String firstName = '';
  static String lastName = '';
  static String loginName = '';
  static String password = '';

  static int recipesCount = 0;
  static int followers = 0;
  static int following = 0;
  static String bio = ''; //50 CHAR LIMIT
}


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
          image: DecorationImage(image: AssetImage("lib/assets/homescreen.PNG"), fit: BoxFit.cover),
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
            margin: const EdgeInsets.only(top: 25, left: 10,),

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
                              builder: (context) => new ProfileScreen())
                          );
                        },
                        child: const Icon(Icons.person),
                      ),
                    ]
                ),

                Column(
                    children:<Widget>[

                      const SizedBox(width: 16),

                      FloatingActionButton.small(
                        backgroundColor: Color(0xff5F2829),
                        onPressed: () {
                          // Add your onPressed code here!
                        },
                        child: const Icon(Icons.add),
                      ),
                    ]
                ),

                Container(
                      margin: const EdgeInsets.only(top: 0, left: 50),
                      width: 125,
                      child:
                      MaterialButton(
                          child: Text('Favorite',style: TextStyle(fontSize: 20 ,color:const Color(0xffF9DEE8), )
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

                          color: const Color(0xff5F2829),
                          shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22.0) ),
                          textColor: Color(0xffF9DEE8),
                          padding: EdgeInsets.all(2.0),
                          splashColor: Colors.black
                      ),
                    ),

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
                    Text(GlobalData.loginName + 'test',style: TextStyle(fontSize: 60 ,color:Colors.black)),
                  ],
                ), //NAME


                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        margin: const EdgeInsets.only(top: 10, right: 200, bottom: 5),
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
                        child: const Expanded(
                        flex: 1,


                        child: SingleChildScrollView(
                          scrollDirection: Axis.vertical,

                          child: Text(
                            "1 Description that is too long in text format(Here Data is coming from API) jdlksaf j klkjjflkdsjfkddfdfsdfds 2 Description that is too long in text format(Here Data is coming from API) d fsdfdsfsdfd dfdsfdsf sdfdsfsd d 3 Description that is too long in text format(Here Data is coming from API)  adfsfdsfdfsdfdsf   dsf dfd fds fs4 Description that is too long in text format(Here Data is coming from API) dsaf dsafdfdfsd dfdsfsda fdas dsad5 Description that is too long in text format(Here Data is coming from API) dsfdsfd fdsfds fds fdsf dsfds fds 6 Description that is too long in text format(Here Data is coming from API) asdfsdfdsf fsdf sdfsdfdsf sd dfdsf7 Description that is too long in text format(Here Data is coming from API) df dsfdsfdsfdsfds df dsfds fds fsd8 Description that is too long in text format(Here Data is coming from API)9 Description that is too long in text format(Here Data is coming from API)10 Description that is too long in text format(Here Data is coming from API)",
                            style: TextStyle(
                              fontSize: 16.0, color: Colors.black, //backgroundColor: Colors.white,
                            ),
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
                        margin: const EdgeInsets.only(top: 20, right: 200, bottom: 5),
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
                        child: const Expanded(
                          flex: 1,
                          child: SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: Text(
                              "1 Description that is too long in text format(Here Data is coming from API) jdlksaf j klkjjflkdsjfkddfdfsdfds 2 Description that is too long in text format(Here Data is coming from API) d fsdfdsfsdfd dfdsfdsf sdfdsfsd d 3 Description that is too long in text format(Here Data is coming from API)  adfsfdsfdfsdfdsf   dsf dfd fds fs4 Description that is too long in text format(Here Data is coming from API) dsaf dsafdfdfsd dfdsfsda fdas dsad5 Description that is too long in text format(Here Data is coming from API) dsfdsfd fdsfds fds fdsf dsfds fds 6 Description that is too long in text format(Here Data is coming from API) asdfsdfdsf fsdf sdfsdfdsf sd dfdsf7 Description that is too long in text format(Here Data is coming from API) df dsfdsfdsfdsfds df dsfds fds fsd8 Description that is too long in text format(Here Data is coming from API)9 Description that is too long in text format(Here Data is coming from API)10 Description that is too long in text format(Here Data is coming from API)",
                              style: TextStyle(
                                fontSize: 16.0, color: Colors.black, //backgroundColor: Colors.white,
                              ),
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
                        height: 30,
                        margin: const EdgeInsets.only(top: 15),
                     //   child: Text(GlobalData.bio.toString() + 'oooooooooo oooooooooo oooooooooo oooooooooo',
                       //     style: TextStyle(fontSize: 15 ,color:Colors.black))
                    ),
                  ],
                ), //bio






              ],
            )
        )
    );
  }





}


//use these???????

/// The base class for the different types of items the list can contain.
abstract class ListItem {
  /// The title line to show in a list item.
  Widget buildTitle(BuildContext context);

  /// The subtitle line, if any, to show in a list item.
  Widget buildSubtitle(BuildContext context);
}

/// A ListItem that contains data to display a heading.
class HeadingItem implements ListItem {
  final String heading;

  HeadingItem(this.heading);

  @override
  Widget buildTitle(BuildContext context) {
    return Text(
      heading,
      style: Theme.of(context).textTheme.headline5,
    );
  }

  @override
  Widget buildSubtitle(BuildContext context) => const SizedBox.shrink();
}

/// A ListItem that contains data to display a message.
class MessageItem implements ListItem {
  final String sender;
  final String body;

  MessageItem(this.sender, this.body);

  @override
  Widget buildTitle(BuildContext context) => Text(sender);

  @override
  Widget buildSubtitle(BuildContext context) => Text(body);
}
