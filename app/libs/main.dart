import 'package:flutter_app/routes/routes.dart';
Rewrite MyApp
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(),
      routes: Routes.getroutes,
    );
  }
}
