import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/screens/HomeScreen.dart';
import 'package:mobile/screens/Profile.dart';
import 'package:mobile/screens/ViewRecipe.dart';
import 'package:mobile/screens/EditProfile.dart';

class Routes {
  static const String LOGINSCREEN = '/login';
  static const String HOMESCREEN = '/homescreen';
  static const String PROFILEPAGE = '/profile';
  static const String RECIPESCREEN = '/recipe';
  static const String EDITPROFILESCREEN = '/editprofile';

  // routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
    '/': (context) => LoginScreen(),
    LOGINSCREEN: (context) => LoginScreen(),
    HOMESCREEN: (context) => HomeScreen(),
    PROFILEPAGE: (context) => ProfileScreen(),
    RECIPESCREEN: (context) => RecipeScreen(),
    EDITPROFILESCREEN: (context) => EditProfileScreen(),
  };
}
