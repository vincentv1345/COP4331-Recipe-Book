import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile/screens/Profile.dart';
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
        width:  MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,

        child:
        Column(
        //  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
          crossAxisAlignment: CrossAxisAlignment.center,

          //Center Column contents horizontal
          children: <Widget>[
           // alignment: Alignment.topCenter,



        Container(
          margin: const EdgeInsets.only(top: 10),

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

                  Column(
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            Text(searchMessage,style: const TextStyle(fontSize: 14 ,color:Colors.black)),
                          ],
                        ),

                        Container(
                          width: 200,
                          height: 62,
                          child:
                          TextField (
                            decoration: const InputDecoration(
                                filled: true,
                                fillColor: Colors.white,
                                border: OutlineInputBorder(),
                                labelText: 'Search',
                                hintText: 'Search for a Recipe',
                              contentPadding: EdgeInsets.fromLTRB(5,0,5,0),
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
                    minWidth: 40,

                      child: Text('Go',style: TextStyle(fontSize: 14 ,color:Colors.white)),
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

                      color:const Color(0xff5F2829),
                      textColor: Colors.white,
                      padding: EdgeInsets.all(2.0),
                      splashColor: Colors.grey[100]
                  )

                ],
            ),

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
