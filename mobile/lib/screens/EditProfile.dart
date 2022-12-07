import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/screens/Profile.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';
import 'HomeScreen.dart';
import 'Profile.dart';

String message = "", newMessageText = ''; //error messages

String bioText = '', userName = '';



class EditProfileScreen extends StatefulWidget {
  @override
  _CreateScreenState createState() => _CreateScreenState();
}

class _CreateScreenState extends State<EditProfileScreen> {
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
                Row( //Create

                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        margin: const EdgeInsets.only(top: 230),
                        child: Text('Edit Profile',style: TextStyle(fontSize: 40 ,color:Colors.black))
                    ),
                  ],
                ), //Create

                Row( //ERROR MSG
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,

                  children: <Widget>[
                    Container(
                      margin: const EdgeInsets.only(top: 0),
                      child: Text('$message',style: TextStyle(fontSize: 18 ,color:Colors.black)),
                    )
                  ],
                ), //ERROR MSG
                Row( //USERNAME
                    mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        margin: const EdgeInsets.only(top: 20),
                        width: 350,
                        child:
                        TextField (
                          style: TextStyle(fontSize: 18, color: Colors.black.withOpacity(1.0)),
                          decoration: const InputDecoration(
                            filled: true,
                            fillColor: Colors.white,
                            border: OutlineInputBorder(),
                            //border: InputBorder.none,
                            labelText: 'Bio',
                            hintText: 'Enter a bio',
                            labelStyle: TextStyle(color: Colors.black),

                          ),
                          onChanged: (text) {
                            bioText = text;
                          },
                        ),
                      ),
                    ]
                ),
                Container(
                  margin: const EdgeInsets.only(top: 20),
                  width: 350,
                  child:
                  TextField (
                    style: TextStyle(fontSize: 18, color: Colors.black.withOpacity(1.0)),
                    decoration: const InputDecoration(
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(),
                      //border: InputBorder.none,
                      labelText: 'Username',
                      hintText: 'Enter a new Username',
                      labelStyle: TextStyle(color: Colors.black),

                    ),
                    onChanged: (text) {
                      userName = text;
                    },
                  ),
                ),


                Row( //BUTTON
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      margin: const EdgeInsets.only(top: 15),
                      width: 300,
                      child:
                      MaterialButton(


                      child: Text('Save',style: TextStyle(fontSize: 20 ,color:Colors.white)
                      ),


                          onPressed: () async
                          {
                            newMessageText = "";
                            changeText();



                            try {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => ProfileScreen()));

                              print(userName);
                              print(bioText);
                              GlobalData.bio = bioText;
                              GlobalData.userName = userName;
                              await RecipeData.edit(bioText,userName, GlobalData.userId.trim() );



                            }catch(e){

                            }
                          },

                          color:const Color(0xff5F2829),
                          shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22.0) ),
                          textColor: Colors.white,
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
                    TextButton(
                      child: const Text(
                        'Cancel',
                        style: TextStyle(fontSize: 20, color: Color(0xff5F2829)),
                      ),
                      onPressed: () {
                        bioText = '';
                        //signup screen
                        Navigator.push(context, new MaterialPageRoute(
                            builder: (context) => new ProfileScreen())
                        );
                      },)
                  ],
                ) //CREATE ACC

              ],
            )
        )
    );
  }




}
