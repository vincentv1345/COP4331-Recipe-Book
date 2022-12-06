import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';
import 'package:outline_search_bar/outline_search_bar.dart';
import 'package:mobile/screens/ViewRecipe.dart';

import '../main.dart';
import 'CreateAccount.dart';
import 'HomeScreen.dart';
import 'Profile.dart';
import 'AddScreen.dart';
import 'Profile.dart';

String message = '', newMessageText = '';
String addMessage = '', newAddMessage = '';
String searchMessage = '', newSearchMessage = '';
String searchInput = '';

List<dynamic> recipes = List.empty(growable: true);

class currentRecipe
{
  static String id = '';
  static String recipeName = '';
  static String recipeIngredients = '';
  static String recipeDirections = '';

  //static bool isPublic = true;
  //static int Tags[10] = 0; no
  //static int DateCreated = 0; //not an int
}


//function to run search when page loads
void populateHomepage() async {
  if(recipes.isEmpty) {
    recipes = await RecipeData.search('');
  }
}



//String message = "help", newMessageText = ''; //error messages
String loginName = '', email = '', password = '';
String recipename = '',ingredients = '', directions = '';


class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
  }


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

  @override
  Widget build(BuildContext context)  {
    populateHomepage();
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
    var ret;

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
                  margin: const EdgeInsets.only(top: 50, left: 0,),

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
                                Navigator.push(context, new MaterialPageRoute(
                                    builder: (context) => new ProfileScreen())
                                );
                              },
                              child: const Icon(Icons.person),
                            ),
                          ]
                      ),
                      Column(
                       children: <Widget>[
                           Container(
                               margin: const EdgeInsets.only(top: 5, left: 20,),
                               height:50,
                               width: 200,
                               child:
                            TextField (
                              onChanged: (text) {
                                searchInput = text;
                              },
                                 decoration: InputDecoration(
                                  filled: true,
                                  fillColor: Colors.white,
                                  border: OutlineInputBorder(),
                                  labelText: 'Search',
                                 hintText: 'Search for Recipe Name',

                                   suffixIcon: IconButton(

                                     onPressed: () async
                                     {
                                       newMessageText = "";
                                       changeText();

                                       ret = await RecipeData.search(searchInput);
                                       recipes = ret;
                                       for (var data in ret) {
                                              print("\n HERE NAME: " + data["RecipeName"]);
                                             }

                                       //Refresh homepage
                                       Navigator.push(context, new MaterialPageRoute(
                                           builder: (context) => new HomeScreen())
                                       );
                                       searchInput = '';
                                     },


                                     icon: Icon(Icons.search),
                                   ),
                                 ),
                            )
                           )]
                           )
                        ]
                  ), //buttons
                ),

                Container(

                  height: MediaQuery.of(context).size.height,

                  child: ListView.builder(

                    itemCount: recipes.length,

                    itemBuilder: (context, index) {
                      final recipe = recipes[index];
                      print("PRINTING " + recipe["RecipeName"] + " " + recipe["UserID"].toString()); //make sure all of them have UserID

                      return
                        TextButton(
                          child: Text(recipe["RecipeName"] + "\n",style: TextStyle(fontSize: 20 ,color:Colors.black)),
                          onPressed: () {
                            print(recipe);

                            currentRecipe.id = recipe["_id"];

                            if(recipe["RecipeName"] != null)
                              currentRecipe.recipeName = recipe["RecipeName"];
                            else
                              currentRecipe.recipeDirections = "No Name";

                            if(recipe["RecipeDirections"] != null)
                              currentRecipe.recipeDirections = recipe["RecipeDirections"];
                            else
                              currentRecipe.recipeDirections = "No Directions";

                            if(recipe["RecipeIngredients"] != null)
                              currentRecipe.recipeIngredients = recipe["RecipeIngredients"];
                            else
                              currentRecipe.recipeIngredients = "No Ingredients";

                            print("VIEWING " + currentRecipe.id + currentRecipe.recipeName + currentRecipe.recipeDirections + currentRecipe.recipeIngredients);

                            Navigator.of(context).push(MaterialPageRoute(
                                builder: (context) => RecipeScreen()));
                          },);
                        //Text(recipe["RecipeName"] + "\n",style: TextStyle(fontSize: 20 ,color:Colors.black));
                    },
                  ),
                ),
              ],
            )
        )
    );
  }





}

