import 'dart:convert';
import 'package:http/http.dart' as http;

class RecipeData {
  //base url for api can access specific API functions with base + '/function/
  var base = 'https://recipebook5959.herokuapp.com/api/';

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
  Future<String> doLogin(String base, String email, String password,String outgoing) async
  {
    var url = base + '/login';
    var ret = "";
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

}
