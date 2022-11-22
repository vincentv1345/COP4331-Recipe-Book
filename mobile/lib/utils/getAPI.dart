import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class RecipeData {


  static Future<String> getJson(String url, String data) async
  {
    String ret = "";

    try {
      http.Response res = await http.post(Uri.parse(url),
        body: utf8.encode(data),
        headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

          },
              encoding : Encoding.getByName('utf-8'),
      );
      if(res.statusCode==200 || res.statusCode==201)
        {
          ret = res.body;
        }else{
        throw Exception('Status Code' + res.statusCode.toString());
      }

    }
    catch (e) {
      print(e.toString());
    }

    return ret;
  }
/*
  //complete API request for login
  Future<dynamic> login(String email, String password) async {

    Map<String, String> parameters = {
      "Email": email,
      "Password": password,
    };
    var uri = Uri.parse(
      base + '/login',
    );
    try {
      var response = await http.post(uri, body: parameters);
      if (response.statusCode == 200 || response.statusCode == 201) {
        return response.body;
      }
    }

    catch(e)
    (

    );
  }
  */

}



/*
  Future<dynamic> CreateAccount(String email, String password) async
  {



  }

   */

