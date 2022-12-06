import 'package:flutter/material.dart';
import 'package:mobile/screens/AddScreen.dart';
import 'package:mobile/screens/EditProfile.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/utils/getAPI.dart';
import 'dart:convert';

import '../main.dart';
import 'CreateAccount.dart';
import 'HomeScreen.dart';
import 'ViewRecipe.dart';

String message = "help", newMessageText = ''; //error messages
String loginName = '', email = '', password = '';

List<dynamic> myRecipes = List.empty(growable: true);

void populateProfile() async {

  var user = await RecipeData.getUser("Ducky");

  try {
    var user = await RecipeData.getUser("Ducky");
  }catch(e){
    print("PROFILE ERRORRRRR GETTING USER" + e.toString());
  }

  try {
  myRecipes = await RecipeData.search(GlobalData.userId);
  }catch(e){
    print("PROFILE ERRORRRRR GETTING RECIPES" + e.toString());
  }

  for (var data in myRecipes) {
    print("\n MY RECIPE: " + data["RecipeName"] + data["UserID"]);
  }
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
    populateProfile();
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
        SingleChildScrollView(
            child:

            Column(
              mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
              crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal

              children: <Widget>[

                Container(
                  margin: const EdgeInsets.only(top: 50, left: 20),

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
                    Text(GlobalData.userName,style: const TextStyle(fontSize: 60 ,color:Colors.black)),
                  ],
                ), //NAME

                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        margin: const EdgeInsets.only(top: 10),
                        child:
                        Text( GlobalData.recipesCount.toString() + ' Recipes   ' + GlobalData.followers.toString() + ' Followers   ' +  GlobalData.following.toString() + ' Following',
                            style: TextStyle(fontSize: 20 ,color:Colors.black))
                    ),
                  ],
                ),

                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        height: 30,
                        margin: const EdgeInsets.only(top: 15),
                        child: Text(GlobalData.bio.toString(),
                            style: TextStyle(fontSize: 17 ,color:Colors.black))
                    ),
                  ],
                ), //bio

                /* Row(
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
                ), */   //buttons not used

                Row(
                  mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Container(
                        margin: const EdgeInsets.only(top: 20, right: 200, bottom: 0),
                        child:
                        const Text('My Recipes',
                            style: TextStyle(fontSize: 25 ,color:Colors.black))
                    ),
                  ],
                ),

              /*  Container(


                  height: MediaQuery.of(context).size.height,

                  child: ListView.builder(

                    // Let the ListView know how many items it needs to build.
                    itemCount: recipes.length,
                    // Provide a builder function. This is where the magic happens.
                    // Convert each item into a widget based on the type of item it is.
                    itemBuilder: (context, index) {
                      final recipe = myRecipes[index];
                      print("PROFILE PRINTING " + recipe["RecipeName"]);

                      return
                        TextButton(
                          child: Text(recipe["RecipeName"] + "\n",style: TextStyle(fontSize: 20 ,color:Colors.black)),
                          onPressed: () {
                            print(recipe);

                            if(recipe["RecipeName"] != null)
                              currentRecipe.recipeName = recipe["RecipeName"];

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



                ),*/

              ],
            )
        )
    );
  }
}

