import 'dart:convert';

import 'package:flutter/material.dart';

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



class CardsScreen extends StatefulWidget {
  @override
  _CardsScreenState createState() => _CardsScreenState();
}

class _CardsScreenState extends State<CardsScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.red,
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
      /*  decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/images/bulb.jpg"),
              fit: BoxFit.cover,
            ),
        ), */
        width: 400,
        child:
        Column(
          mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
          crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
          children: <Widget>[
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
                        Container(
                          width: 200,
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
                        Row(
                          children: <Widget>[
                            Text('$searchMessage',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                          ],
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

                        var jsonObject;
                        try
                        {
                          String url = 'https://cop4331-10.herokuapp.com/api/searchcards';
                          String ret = await CardsData.getJson(url, payload);
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

                ]
            ),
            Row(
                children: <Widget>[
                  Column(
                    children: <Widget>[
                      Container(
                        width: 200,
                        child:
                        TextField (
                          obscureText: true,
                          decoration: InputDecoration(
                              filled: true,
                              fillColor: Colors.white,
                              border: OutlineInputBorder(),
                              labelText: 'Add',
                              hintText: 'Add a Card'
                          ),
                          onChanged: (text)
                          {
                            card = text;
                          },

                        ),
                      ),
                      Row(
                        children: <Widget>[
                          Text('$addMessage',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                        ],
                      ),
                    ],
                  ),

                  MaterialButton(
                      child: Text('Add',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                      onPressed: () async
                      {
                        newAddMessage = "";
                        changeAddText();

                        String payload = '{"userId":"' + GlobalData.userId.toString() + '","card":"' + card.trim() + '"}';

                        var jsonObject;
                        try
                        {
                          String url = 'https://cop4331-10.herokuapp.com/api/addcard';
                          String ret = await CardsData.getJson(url, payload);
                          jsonObject = json.decode(ret);
                        }
                        catch(e)
                        {
                        //  newAddMessage = e.message;
                          changeAddText();
                          return;
                        }

                        newAddMessage = "Card has been added";
                        changeAddText();
                      },

                      color:Colors.brown[50],
                      textColor: Colors.black,
                      padding: EdgeInsets.all(2.0),
                      splashColor: Colors.grey[100]
                  )

                ]
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
