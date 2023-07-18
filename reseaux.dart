import 'package:flutter/material.dart';
import 'package:myperform/connect.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;

void showErrorDialog(BuildContext context) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: const Text('Erreur'),
        content: const Text('Échec du chargement du PDF'),
        actions: <Widget>[
          TextButton(
            child: const Text('OK'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        ],
      );
    },
  );
}

void launchURL(BuildContext context) async {
  final Uri url = Uri.parse(
    'https://www.cogelis.com',
  ); // Add your PDF link here

  if (url.toString().isEmpty) {
    showErrorDialog(context); // Display error dialog
    return;
  }

  // ignore: deprecated_member_use
  if (!(await url_launcher.launch(url.toString()))) {
    showErrorDialog; // Affiche une boîte de dialogue d'erreur
  }
}

void launchDiscordDorian(BuildContext context) async {
  final Uri url = Uri.parse(
    'https://www.instagram.com/dorian_ptst/',
  ); // Add your PDF link here

  if (url.toString().isEmpty) {
    showErrorDialog(context); // Display error dialog
    return;
  }

  // ignore: deprecated_member_use
  if (!(await url_launcher.launch(url.toString()))) {
    showErrorDialog; // Affiche une boîte de dialogue d'erreur
  }
}

void launchDiscordMaxime(BuildContext context) async {
  final Uri url = Uri.parse(
    'https://www.instagram.com/dorian_ptst/',
  ); // Add your PDF link here

  if (url.toString().isEmpty) {
    showErrorDialog(context); // Display error dialog
    return;
  }

  // ignore: deprecated_member_use
  if (!(await url_launcher.launch(url.toString()))) {
    showErrorDialog; // Affiche une boîte de dialogue d'erreur
  }
}

void launchDiscordQuentin(BuildContext context) async {
  final Uri url = Uri.parse(
    'https://www.instagram.com/dorian_ptst/',
  ); // Add your PDF link here

  if (url.toString().isEmpty) {
    showErrorDialog(context); // Display error dialog
    return;
  }

  // ignore: deprecated_member_use
  if (!(await url_launcher.launch(url.toString()))) {
    showErrorDialog; // Affiche une boîte de dialogue d'erreur
  }
}

class Reseaux extends StatelessWidget {
  const Reseaux({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyPerform',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: const _Reseaux(title: 'Réseaux'),
    );
  }
}

class _Reseaux extends StatefulWidget {
  final String title;

  const _Reseaux({required this.title});

  @override
  _ReseauxState createState() => _ReseauxState();
}

class _ReseauxState extends State<_Reseaux> {
  _ReseauxState();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Color(0xFFBF360C),
                Color(0xFFF57C00),
                Color(0xFFBF360C),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              transform: GradientRotation(45),
            ),
          ),
        ),
        title: Text(
          widget.title,
          style: const TextStyle(
            fontFamily: 'merriweather',
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.black,
          ),
        ),
      ),
      body: Container(
        color: const Color.fromRGBO(226, 154, 123, 1.0),
        child: Stack(
          children: [
            Positioned(
              bottom: 0,
              right: 0,
              child: Container(
                alignment: Alignment.center,
                width: 150,
                height: 150,
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(0),
                  borderRadius: BorderRadius.circular(50),
                ),
                child: Align(
                  alignment: Alignment.bottomRight,
                  child: SizedBox(
                    width: 85,
                    height: 80,
                    child: Image.asset(
                      'assets/images/myperform.png',
                      fit: BoxFit.fill,
                    ),
                  ),
                ),
              ),
            ),
            const Positioned(
              bottom: 1,
              left: 0,
              right: 0,
              child: Center(
                child: Text(
                  '©2023 MyPerform | Developed By Dorian',
                  style: TextStyle(
                    fontFamily: 'merriweather',
                    fontSize: 8,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
            ),
            Align(
              alignment: Alignment.center,
              child: Container(
                width: 300,
                height: 365,
                padding: const EdgeInsets.all(20.0),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10.0),
                  boxShadow: const [
                    BoxShadow(
                      offset: Offset(3, 3),
                      spreadRadius: -3,
                      blurRadius: 5,
                      color: Color.fromRGBO(246, 235, 20, 0.5),
                    )
                  ],
                ),
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      const SizedBox(height: 20.0),
                      const Text(
                        'Nos Réseaux',
                        style: TextStyle(
                          fontFamily: 'merriweather',
                          fontSize: 22.5,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      const SizedBox(height: 10.0),
                      const Text(
                        'Site Web',
                        style: TextStyle(
                          fontFamily: 'merriweather',
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      InkWell(
                        onTap: () {
                          launchURL(context);
                        },
                        child: const Text(
                          'Cogelis',
                          style: TextStyle(
                            fontFamily: 'merriweather',
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                            color: Colors.blue,
                          ),
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      const Text(
                        'Réseaux developpeurs',
                        style: TextStyle(
                          fontFamily: 'merriweather',
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      const Text(
                        'Discord',
                        style: TextStyle(
                          fontFamily: 'merriweather',
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      InkWell(
                        onTap: () {
                          launchDiscordDorian(context);
                        },
                        child: const Text(
                          'Dorian',
                          style: TextStyle(
                            fontFamily: 'merriweather',
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                            color: Colors.red,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12.0),
                      InkWell(
                        onTap: () {
                          launchDiscordMaxime(context);
                        },
                        child: const Text(
                          'Maxime',
                          style: TextStyle(
                            fontFamily: 'merriweather',
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                            color: Colors.green,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12.0),
                      InkWell(
                        onTap: () {
                          launchDiscordQuentin(context);
                        },
                        child: const Text(
                          'Quentin',
                          style: TextStyle(
                            fontFamily: 'merriweather',
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                            color: Colors.orange,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: 60,
              left: 0,
              right: 0,
              child: Container(
                alignment: Alignment.bottomCenter,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    gradient: const LinearGradient(
                      colors: [
                        Color(0xFFBF360C),
                        Color(0xFFF57C00),
                        Color(0xFFBF360C),
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      transform: GradientRotation(45),
                    ),
                  ),
                  child: TextButton(
                    onPressed: () {
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(builder: (context) => Connect()),
                      );
                    },
                    child: const Text(
                      'Retour',
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
