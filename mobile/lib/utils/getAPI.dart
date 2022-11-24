import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'dart:async';

class RecipeData {


  //complete API request for login
  static Future<dynamic> login(String username, String password) async {

    final response = await http.post(
      Uri.parse('https://recipebook5959.herokuapp.com/api/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        "Username": username,
        "Password": password,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("User Found ${response.statusCode}! ${response.body}");
      return (jsonDecode(response.body));
    } else {
      print("Error logging in ${response.statusCode}! ${response.body}");
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to LOGIN');
    }
  }

  static Future<dynamic> signup(String email, String username, String password) async {

    final response = await http.post(
      Uri.parse('https://recipebook5959.herokuapp.com/api/create_user'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        "Email": email,
        "Username": username,
        "Password": password,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("User Created ${response.statusCode}! ${response.body}");
      return (jsonDecode(response.body));
    } else {
      print("Error creating user ${response.statusCode}! ${response.body}");
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to CREATE USER');
    }
  }
}