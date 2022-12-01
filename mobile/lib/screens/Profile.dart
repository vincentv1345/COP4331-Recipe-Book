import 'package:flutter/material.dart';
import 'package:mobile/screens/EditProfile.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';

import '../main.dart';
import 'CreateAccount.dart';
import 'HomeScreen.dart';

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


class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
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
        decoration: const BoxDecoration(
          image: DecorationImage(image: AssetImage("lib/assets/profilebg.PNG"), fit: BoxFit.cover),
        ),
        width:  MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child:
        SingleChildScrollView(  //????????
            child:

            Column(
              mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
              crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal

              children: <Widget>[

                Container(
                  margin: const EdgeInsets.only(top: 20, left: 10,),

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
                        margin: const EdgeInsets.only(top: 0, left: 10),
                        width: 125,
                        child:
                        MaterialButton(
                            child: Text('Edit Profile',style: TextStyle(fontSize: 18 ,color:Color(0xffF9DEE8))
                            ),

                           onPressed: () {
                              Navigator.push(context, new MaterialPageRoute(
                              builder: (context) => new EditProfileScreen())
                              );
                              },

                            color:const Color(0xff5F2829),
                            shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22.0) ),
                            textColor: Color(0xffF9DEE8),
                            padding: EdgeInsets.all(2.0),
                            splashColor: Colors.black
                        ),
                      ),

                      MaterialButton(
                          child: Text('Logout',style: TextStyle(fontSize: 18 ,color:Color(0xffF9DEE8))),
                          onPressed: ()
                          {
                            Navigator.pushNamed(context, '/login');
                          },
                          color:const Color(0xff5F2829),
                          shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22.0) ),
                          textColor: Color(0xffF9DEE8),
                          padding: EdgeInsets.all(2.0),
                          splashColor: Colors.black
                      )

                    ],
                  ),

                ),




                Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        margin: const EdgeInsets.only(top: 20),
                        width: 350,
                        height: 150,
                        child:
                        CircleAvatar(
                            radius: 80,
                            backgroundColor: Colors.white,
                        child: CircleAvatar(
                            radius: 72,

                            backgroundColor: Colors.transparent,
                            child: SizedBox(


                                child: ClipOval(

                                  child: Image.asset("lib/assets/profilepicture.png",
                                  ),
                                )
                            )
                        )
                        )
                      ),
                    ]
                ), //IMAGE



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
                        margin: const EdgeInsets.only(top: 10),
                        child:
                        Text( GlobalData.recipesCount.toString() + ' Recipes   ' + GlobalData.followers.toString() + ' Follwers   ' +  GlobalData.following.toString() + ' Following',
                            style: TextStyle(fontSize: 20 ,color:Colors.black))
                    ),
                  ],
                ), //rep folling er

                Row(

                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        height: 30,
                        margin: const EdgeInsets.only(top: 15),
                        child: Text(GlobalData.bio.toString() + 'oooooooooo',
                            style: TextStyle(fontSize: 15 ,color:Colors.black))
                    ),
                  ],
                ), //bio

                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: <Widget>[
                    Container(
                        margin: const EdgeInsets.only(right: 50),
                        color: Color(0xffFCF6EC),
                        child:
                      TextButton(
                        child: const Text(
                          'my recipes',
                          style: TextStyle(fontSize: 16, color: Color(0xff000000)),
                        ),
                        onPressed: () {
                            print("ndfkns" + GlobalData.loginName);


                        },
                      ),
                    ),

                    Container(
                      margin: const EdgeInsets.only(left: 50),
                      color: Color(0xffFCF6EC),
                      child:
                    TextButton(
                      child: const Text(
                        'liked recipes',
                        style: TextStyle(fontSize: 16, color: Color(0xff000000)),
                      ),
                      onPressed: () {
                        //signup screen
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => LoginScreen()));
                      },)
                    ),

                  ],
                ), //buttons



                Row(
                    mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        margin: const EdgeInsets.only(top: 15),
                        width: 350,
                       /*  child: ListView.builder(
                          // Let the ListView know how many items it needs to build.
                          itemCount: items.length,
                          // Provide a builder function. This is where the magic happens.
                          // Convert each item into a widget based on the type of item it is.
                          itemBuilder: (context, index) {
                            final item = items[index];

                            return Row(

                                children: <Widget>[

                                  const CircleAvatar(
                                    backgroundImage: AssetImage('assets/images/cat3.png'), //set image //item.image
                                    radius: 100,
                                  ),

                                  TextButton(
                                    child: const Text(
                                      'item.name',
                                      style: TextStyle(fontSize: 20, color: Color(0xff5F2829)),
                                    ),
                                    onPressed: () {
                                      //open recipe info pageeeeee
                                      Navigator.of(context).push(MaterialPageRoute(
                                          builder: (context) => LoginScreen()));
                                    },
                                  )

                                  ]

                            );
                          },
                        ), */

                        )

                    ]
                )

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
