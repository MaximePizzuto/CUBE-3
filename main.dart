import 'package:flutter/material.dart';
import 'package:myperform/connect.dart';

//mettre un message d'erreur si les identifiants sont incorrectes
//mettre le bouton retour en dessous du contnaire

void main() async {
  runApp(const MyPerformConnect());
}

class MyPerformConnect extends StatelessWidget {
  const MyPerformConnect({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyPerform',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: const _Artwork(title: 'MyPerform'),
    );
  }
}

class _Artwork extends StatefulWidget {
  final String title;

  const _Artwork({required this.title});

  @override
  _ArtworkState createState() => _ArtworkState();
}

class _ArtworkState extends State<_Artwork> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: const Color.fromRGBO(230, 93, 43, 1.0),
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
      body: Center(
        child: Container(
          color: const Color.fromRGBO(226, 154, 123, 1.0),
          child: Stack(
            children: [
              Positioned(
                top: MediaQuery.of(context).size.height * 0.25 -
                    0.2 * MediaQuery.of(context).size.height,
                left: 0,
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
                    alignment: Alignment.topCenter - const Alignment(0.0, 0.2),
                    child: SizedBox(
                      width: 160,
                      height: 325,
                      child: Image.asset(
                        'assets/images/myperform.png',
                        fit: BoxFit.fill,
                      ),
                    ),
                  ),
                ),
              ),
              Align(
                alignment: Alignment.center,
                child: Container(
                  width: 300,
                  height: 120,
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
                  child: Column(
                    children: [
                      const Text(
                        'Bienvenue sur MyPerform',
                        style: TextStyle(
                          fontFamily: 'merriweather',
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      TextButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => Connect()),
                          );
                        },
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(
                              const Color.fromRGBO(230, 93, 43, 1.0)),
                          padding: MaterialStateProperty.all<EdgeInsets>(
                              const EdgeInsets.symmetric(horizontal: 5.0)),
                          overlayColor:
                              MaterialStateProperty.resolveWith<Color>(
                                  (Set<MaterialState> states) {
                            if (states.contains(MaterialState.hovered)) {
                              return const Color.fromARGB(255, 193, 91, 1);
                            }
                            return const Color.fromRGBO(230, 93, 43, 1.0);
                          }),
                        ),
                        child: const Center(
                          child: Text(
                            'connexion',
                            style: TextStyle(
                              fontSize: 20.0,
                              color: Colors.black,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
