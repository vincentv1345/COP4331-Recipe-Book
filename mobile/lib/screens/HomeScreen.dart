import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/screens/Profile.dart';
import 'package:mobile/screens/AddScreen.dart';
import '../utils/getAPI.dart';


String message = '', newMessageText = '';
String addMessage = '', newAddMessage = '';
String searchMessage = '', newSearchMessage = '';


class GlobalData
{
  static int userId = 0;
  static String firstName = '';
  static String lastName = '';
  static String loginName = '';
  static String password = '';
}

var card, search;



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
      backgroundColor: Colors.black,
      body: MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {

  @override
  void initState() {
    super.initState();
  }



  @override
  Widget build(BuildContext context) {

    void changeText() {
      setState(() {
        message = newMessageText;
      });
    }

    void changeAddText() {
      setState(() {
        addMessage = newAddMessage;
      });
    }

    void changeSearchText() {
      setState(() {
        searchMessage = newSearchMessage;
      });
    }


    return Container(
        decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("lib/assets/homescreen.PNG"),
              fit: BoxFit.cover,
            ),
        ),
        width: 500,
        child:
        Column(
          mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
          crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
          children: <Widget>[
           // alignment: Alignment.topCenter,


            Row(

              children: <Widget>[

                MaterialButton(
                    child: Text('Logout',style: TextStyle(fontSize: 14 ,color:Colors.black)),
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
            ),

            Row(
                children: <Widget>[
                  Column(
                    children: <Widget>[
                    IconButton(
                      icon: Image.asset("lib/assets/cookbook.png"),
                      iconSize: 50,
                      onPressed: () {
                        // Navigator.pushNamed(context, '/profile');
                        Navigator.push(context, new MaterialPageRoute(
                            builder: (context) => new ProfileScreen())
                        );},
                    ),

                  ]),
                  Column(
                    children:<Widget>[

                            const SizedBox(width: 16),

                            FloatingActionButton.small(
                              backgroundColor: Color(0xff5F2829),
                              onPressed: () {
                                // Add your onPressed code here!
                                Navigator.push(context, new MaterialPageRoute(
                                    builder: (context) => new AddScreen())
                                );
                              },
                              child: const Icon(Icons.add),
                            ),

                    ]
                  ),

                  Column(
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            Text('$searchMessage',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                          ],
                        ),

                        Container(
                          width: 150,
                          child:
                          TextField (
                            decoration: InputDecoration(
                                filled: true,
                                fillColor: Colors.white,
                                border: OutlineInputBorder(),
                                labelText: 'Search',
                                hintText: 'Search for a Card'
                            ),
                            onChanged: (text)
                            {
                              search = text;
                            },

                          ),
                        ),


                      ]
                  ),


                  MaterialButton(
                      child: Text('Search',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                      onPressed: () async
                      {
                        newSearchMessage = "";
                        changeSearchText();

                       String payload = '{"userId":"' + GlobalData.userId.toString() + '","search":"' + search.trim() + '"}';
                        var data = {"userId": GlobalData.userId ,"search": search};


                        var jsonObject;
                        try
                        {
                          String url = 'https://cop4331-10.herokuapp.com/api/searchcards';
                          String ret = await RecipeData.login(url, payload); //not correct
                          jsonObject = json.decode(ret);
                        }
                        catch(e)
                        {
                         // newSearchMessage = e.message;
                          changeSearchText();
                          return;
                        }

                        var results = jsonObject["results"];
                        var i = 0;
                        while( true )
                        {
                          try
                          {
                            newSearchMessage += results[i];
                            newSearchMessage += "\n";
                            i++;
                          }
                          catch(e)
                          {
                            break;
                          }
                        }

                        changeSearchText();
                      },

                      color:Colors.brown[50],
                      textColor: Colors.black,
                      padding: EdgeInsets.all(2.0),
                      splashColor: Colors.grey[100]
                  )

                ],


            ),

            Row(
              children: <Widget>[
                Text('$message',style: TextStyle(fontSize: 14 ,color:Colors.black)),
              ],
            )
          ],
        )
    );
  }


}
