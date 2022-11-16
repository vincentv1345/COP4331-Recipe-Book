import 'dart:convert';
import 'package:http/http.dart' as http;

class RecipeData {
  //base url for api can access specific API functions with base + '/function/


  static Future<String> getJson(String url, String outgoing) async
  {
    String ret = "";

    try
    {
      http.Response response = await http.post(url,
          body: utf8.encode(outgoing),
          headers:
          {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          encoding: Encoding.getByName("utf-8")
      );
      ret = response.body;
    }
    catch (e)
    {
      print(e.toString());
    }

    return ret;
  }

  //complete API request for login
  Future<String> doLogin(String url, String email, String password) async
  {
    var ret = "";

    var jsonBody = {"email": "email", "password":"password"};

    try
    {
      http.Response response = await http.post(url,
        body: jsonBody,
      );
      ret = response.body;
    }
    catch (e)
    {
      print(e.toString());
    }

    return ret;

  }
  /*
  Future<String> CreateAccount(String url, String email, String password) async
  {

    var ret = "";

    //var jsonBody = {"email": "email", "password":"password"};

    try
    {
      http.Response response = await http.post(url,
        body: jsonBody,
      );
      ret = response.body;
    }
    catch (e)
    {
      print(e.toString());
    }

    return ret;

  }

   */

}
