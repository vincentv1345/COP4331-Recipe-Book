import 'package:flutter/material.dart';
import 'package:mobile/routes/routes.dart';
import 'package:web_socket_channel/io.dart';


void main() {
  runApp(MyApp());
}


class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: 'Recipe-Book',
      debugShowCheckedModeBanner: false,
      //theme: ThemeData(),
     // home: LoginScreen(),
      routes: Routes.getroutes,
    );
  }

}

