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
String recipeName = '',recipeingredients = '', directions = '';
bool isChecked = false;


class AddScreen extends StatefulWidget {
  @override
  _AddScreenState createState() => _AddScreenState();
}

class _AddScreenState extends State<AddScreen> {
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
        padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
        decoration: const BoxDecoration(
          image: DecorationImage(image: AssetImage("lib/assets/add.png"), fit: BoxFit.cover),
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
                  margin: const EdgeInsets.only(top: 60, left: 0,),

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
                                Navigator.push(context, new MaterialPageRoute(
                                    builder: (context) => new ProfileScreen())
                                );
                              },
                              child: const Icon(Icons.person),
                            ),
                          ]
                      ),
                    ],
                  ), //buttons
                ),


                Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[

                      Container(
                          padding: EdgeInsets.all(0), // Border width
                          decoration: BoxDecoration(color: Colors.transparent,),
                          alignment: Alignment.topLeft,
                          margin: const EdgeInsets.only(top: 40,right: 15,bottom: 40),
                          width: MediaQuery.of(context).size.width-300,
                          height: 100,

                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(8.0),

                            child: Image.asset(
                              'lib/assets/.png',
                              width: 200.0,
                              height: 200.0,
                              fit: BoxFit.fitWidth,
                              scale: 1,
                            ),
                          )
                      ),
                      Row(
                        children: <Widget>[
                      SizedBox(
                        width: 200,
                        height: 50,

                        child:
                        TextFormField(
                          keyboardType: TextInputType.multiline,
                          maxLines: 1,
                          autofocus: false,
                          decoration: InputDecoration(
                            filled: true,
                            fillColor: Colors.white,
                            hintText: "enter recipe name",
                            hintStyle: TextStyle(fontStyle: FontStyle.italic),
                            alignLabelWithHint: true,
                            border:  OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10.0),
                                borderSide: BorderSide(
                                  color: Colors.black,
                                ))),
                          onChanged:(text){
                            recipename = text;
                            print(recipename);
                          }

                        ),
                      ),
                      ]),



                    ]
                ),
                SizedBox(height:0),
                SizedBox(
                  width: 400,

                  child: TextFormField(
                    keyboardType: TextInputType.multiline,
                    maxLines: 6,
                    autofocus: false,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    hintText: "enter required ingredients",
                    hintStyle: TextStyle(fontStyle: FontStyle.italic),
                      alignLabelWithHint: true,
                      border:  OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      borderSide: BorderSide(
                        color: Colors.black,
                      ))),
                    onChanged: (text){
                      recipeingredients = text;
                      print(recipeingredients);
                      print(GlobalData.userId);
                    },
                ),
                ),
                SizedBox(height:10),

                SizedBox(
                  width: 400,
                  child: TextFormField(
                    keyboardType: TextInputType.multiline,
                    maxLines: 6,
                    autofocus: false,
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.white,
                      hintText: "enter recipe directions",
                      hintStyle: TextStyle(fontStyle: FontStyle.italic),
                      alignLabelWithHint: true,
                      border:  OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10.0),
                          borderSide: BorderSide(
                            color: Colors.black,
                          ))),
                      onChanged:(text){
                        directions = text;
                        print(directions);
                      }


                  ),
                ),
                SizedBox(height:10),

              /*  SizedBox(
                  width: 400,

                  child: TextFormField(
                      keyboardType: TextInputType.multiline,
                      maxLines: 1,

                      autofocus: false,
                      decoration: InputDecoration(
                          filled: true,
                          fillColor: Colors.white,
                          hintText: "enter descriptive hashtags",
                          hintStyle: TextStyle(fontStyle: FontStyle.italic),
                          alignLabelWithHint: true,

                          border:  OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10.0),
                              borderSide: BorderSide(
                                color: Colors.black,

                              ))),
                      onChanged:(text){
                        directions = text;
                        print(directions);
                      }


                  ),
                ), */


            Row(
              children: <Widget>[

                /*
                Padding(
                  padding: EdgeInsets.only(left:35, bottom: 10, right: 0, top:10), //apply padding to some sides only
                  child:
                  Text(
                    'Check for public:',
                    textAlign: TextAlign.center,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 20,fontWeight: FontWeight.bold),

                  ),
                ),


              Checkbox(

              value: isChecked,
              onChanged: (bool? value) { // This is where we update the state when the checkbox is tapped
                setState(() {
                  isChecked = value!;
                });
              },
            ), */


                Container(
                //  margin: const EdgeInsets.only(top: 10, left: 250,right:5),
                  width: MediaQuery.of(context).size.width - 20,
                  child:
                  MaterialButton(
                      child: Text('Create',style: TextStyle(fontSize: 18 ,color:Color(0xffffffff))
                      ),

                      onPressed: () async {
                        try{
                          bool isPublic = isChecked;
                          print(isPublic);

                          newMessageText = "";
                          changeText();
                          //var userId = 'car';
                          await RecipeData.create(recipename.trim(), recipeingredients.trim(),directions.trim(),isPublic,GlobalData.userId);
                          Navigator.push(context, new MaterialPageRoute(
                              builder: (context) => new ProfileScreen())
                          );


                        }catch(e){

                        }
                      },

                      color:const Color(0xff5F2829),
                      shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22.0) ),
                      textColor: Color(0xffF9DEE8),
                      padding: EdgeInsets.all(2.0),
                      splashColor: Colors.black
                  ),
                ),
            ]),
















              ],
            )
        )
    );
  }





}


