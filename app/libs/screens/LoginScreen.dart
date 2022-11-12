import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child:
        RaisedButton(
            child: Text('Do Login',style: TextStyle(fontSize: 14 ,color:Colors.black)),
            onPressed: ()
            {
              Navigator.pushNamed(context, '/cards');
            },
            color:Colors.brown[50],
            textColor: Colors.black,
            padding: EdgeInsets.all(2.0),
            splashColor: Colors.grey[100]
        )



    );
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
    return Container();
  }
}
