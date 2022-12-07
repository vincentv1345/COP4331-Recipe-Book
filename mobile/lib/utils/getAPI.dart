import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'dart:async';

class RecipeData {

  int userId;
  String RecipeName = '';

  RecipeData({
    required this.RecipeName,
    required this.userId,
  });


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
      //print(response.body);
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
  static Future<dynamic> create(String recipeName, String recipeIngredients,
      String directions, bool isPublic, String UserID) async
  {
    final response = await http.post(
      Uri.parse('https://recipebook5959.herokuapp.com/api/create_recipe'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',

      },
      body: jsonEncode({
        'RecipeName' : recipeName,
        'RecipeIngredients' : recipeIngredients,
        'RecipeDirections' : directions,
        'IsPublic' : isPublic,
        'UserID': UserID,

      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("Recipe created ${response.statusCode}! ${response.body}");
      return (jsonDecode(response.body));
    } else {
      print("Error creating recipe ${response.statusCode}! ${response.body}");
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to CREATE Recipe');
    }

  }
  static Future<dynamic> edit(String bio, String newUsername,String id) async {

    final response = await http.patch(
      Uri.parse('https://recipebook5959.herokuapp.com/api/update_user'),
      headers:<String,String> {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "UserID" : id,
        "Bio": bio,
        "Username": newUsername,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("User updated ${response.statusCode}");
      return (jsonDecode(response.body));
    } else {
      print("Error updating user ${response.statusCode}! ${response.body}");
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to update user');
    }
  }
  static Future<dynamic> delete(String id) async {

    final response = await http.delete(
      Uri.parse('https://recipebook5959.herokuapp.com/api/update_user'),
      headers:<String,String> {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "_id" : id,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("User updated ${response.statusCode}");
      return (jsonDecode(response.body));
    } else {
      print("Error updating user ${response.statusCode}! ${response.body}");
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to update user');
    }
  }

  static Future<List> search(String RecipeName) async {

    final response = await http.post(
      Uri.parse('https://recipebook5959.herokuapp.com/api/search_recipe'),
      headers:<String,String> {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "RecipeName": RecipeName,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("Recipe Search: ${response.statusCode} ");
      print("Recipe Search: ${response.body} ");

      return (jsonDecode(response.body));
    } else {
      print("Error searching ${response.statusCode}! ${response.body}");
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to search');
    }
  }


  static Future<List> getUserRecipes(String UserID) async {
    print("trying " + UserID);

    final response = await http.post(
      Uri.parse('https://recipebook5959.herokuapp.com/api/get_recipeList'),
      headers:<String,String> {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "UserID": UserID,  //or whatever he makes it
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("My Recipes: ${response.statusCode} ");
      print("My Recipes: ${response.body} ");

      return (jsonDecode(response.body));
    } else {
      print("Error getting my recipes ${response.statusCode}! ${response.body}");
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to get my recipes');
    }
  }

  static Future<List> getUser(String user) async {

    final response = await http.post(
      Uri.parse('https://recipebook5959.herokuapp.com/api/search_user'),
      headers:<String,String> {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "Username": user,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
      print("User Search: ${response.statusCode} ");
      print("User Search: ${response.body} ");

      return (jsonDecode(response.body));
    } else {
      print("Error searching ${response.statusCode}! ${response.body}");
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to search');
    }
  }


}

