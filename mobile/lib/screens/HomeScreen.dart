import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';

import '../main.dart';
import 'CreateAccount.dart';
import 'HomeScreen.dart';
import 'Profile.dart';
import 'AddScreen.dart';

String message = "help", newMessageText = ''; //error messages
String loginName = '', email = '', password = '';
String recipename = '',ingredients = '', directions = '';

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


class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
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
                  margin: const EdgeInsets.only(top: 25, left: 0,),

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
                                // Add your onPressed code here!
                              },
                              child: const Icon(Icons.person),
                            ),
                          ]
                      ),
                    ],
                  ), //buttons
                ),
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
