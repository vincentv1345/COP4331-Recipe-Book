import 'package:flutter/material.dart';
import 'package:mobile/screens/LoginScreen.dart';
import 'package:mobile/screens/HomeScreen.dart';
import 'package:mobile/screens/Profile.dart';

class Routes {
  static const String LOGINSCREEN = '/login';
  static const String HOMESCREEN = '/homescreen';
  static const String PROFILEPAGE = '/profile';

  // routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
    '/': (context) => LoginScreen(),
    LOGINSCREEN: (context) => LoginScreen(),
    HOMESCREEN: (context) => HomeScreen(),
    PROFILEPAGE: (context) => ProfileScreen(),
  };
}
