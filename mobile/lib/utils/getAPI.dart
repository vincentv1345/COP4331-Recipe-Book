import 'dart:convert';
import 'package:http/http.dart' as http;

class RecipeData {

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
  /*
  Future<dynamic> doLogin(String email, String password) async
  {
    //var ret = "";

    final response = await http
        .get(Uri.parse('https://cop4331-10.herokuapp.com/api/login'));

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      return Album.fromJson(jsonDecode(response.body));
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to load album');
    }
  }

  }



  Future<dynamic> CreateAccount(String email, String password) async
  {



  }

   */

}
