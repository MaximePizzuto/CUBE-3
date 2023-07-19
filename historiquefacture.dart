import 'package:flutter/material.dart';
import 'package:myperform/accueil.dart';

//mettre sur une page entiere permettant de tout voir et que ce sois plus simple

class Facture extends StatelessWidget {
  const Facture(
      {Key? key,
      required this.userNom,
      required this.formulePrix,
      required this.formuleNom,
      required this.userMdp,
      required this.userPrenom})
      : super(key: key);
  final String formulePrix;
  final String formuleNom;
  final String userMdp;
  final String userNom;
  final String userPrenom;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyPerform',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: _Facture(
        title: 'MyPerform',
        formulePrix: formulePrix,
        formuleNom: formuleNom,
        userMdp: userMdp,
        userNom: userNom,
        userPrenom: userPrenom,
      ),
    );
  }
}

class _Facture extends StatefulWidget {
  final String title;
  final String formulePrix;
  final String formuleNom;
  final String userMdp;
  final String userNom;
  final String userPrenom;

  const _Facture(
      {required this.title,
      required this.userPrenom,
      required this.formulePrix,
      required this.formuleNom,
      required this.userMdp,
      required this.userNom});

  @override
  // ignore: no_logic_in_create_state
  _FactureState createState() => _FactureState(
      formulePrix: formulePrix,
      formuleNom: formuleNom,
      userMdp: userMdp,
      userNom: userNom,
      userPrenom: userPrenom);
}

class _FactureState extends State<_Facture> {
  final String userMdp;
  final String userNom;
  final String userPrenom;
  final String formulePrix;
  final String formuleNom;
  final String ancienFormule = 'DUER';

  _FactureState(
      {
      required this.formulePrix,
      required this.formuleNom,
      required this.userMdp,
      required this.userNom,
      required this.userPrenom});
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
      body: Center(
        child: Container(
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
                  height: 390,
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
                        Align(
                          alignment: Alignment.center,
                          child: Container(
                            width: 250,
                            height: 90,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10.0),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.2),
                                  blurRadius: 6.0,
                                  spreadRadius: 2.0,
                                  offset: const Offset(0, 3),
                                ),
                              ],
                            ),
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.all(20.0),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  child: Column(
                                    children: [
                                      Text(
                                        'Formule $formuleNom',
                                        style: const TextStyle(
                                          fontFamily: 'merriweather',
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.black,
                                        ),
                                      ),
                                      const SizedBox(height: 5.0),
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            '$formulePrix € par an',
                                            style: const TextStyle(
                                              fontFamily: 'merriweather',
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.black,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 10.0),
                        Align(
                          alignment: Alignment.center,
                          child: Container(
                            width: 250,
                            height: 90,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10.0),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.2),
                                  blurRadius: 6.0,
                                  spreadRadius: 2.0,
                                  offset: const Offset(0, 3),
                                ),
                              ],
                            ),
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.all(20.0),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  child: Column(
                                    children: [
                                      Text(
                                        'Formule $ancienFormule',
                                        style: const TextStyle(
                                          fontFamily: 'merriweather',
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.black,
                                        ),
                                      ),
                                      const SizedBox(height: 5.0),
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            '$formulePrix € par an',
                                            style: const TextStyle(
                                              fontFamily: 'merriweather',
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.black,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 10.0),
                        Align(
                          alignment: Alignment.center,
                          child: Container(
                            width: 250,
                            height: 90,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10.0),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.2),
                                  blurRadius: 6.0,
                                  spreadRadius: 2.0,
                                  offset: const Offset(0, 3),
                                ),
                              ],
                            ),
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.all(20.0),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  child: Column(
                                    children: [
                                      Text(
                                        'Formule $ancienFormule',
                                        style: const TextStyle(
                                          fontFamily: 'merriweather',
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.black,
                                        ),
                                      ),
                                      const SizedBox(height: 5.0),
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            '$formulePrix € par an',
                                            style: const TextStyle(
                                              fontFamily: 'merriweather',
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.black,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 10.0),
                        Align(
                          alignment: Alignment.center,
                          child: Container(
                            width: 250,
                            height: 90,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10.0),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.2),
                                  blurRadius: 6.0,
                                  spreadRadius: 2.0,
                                  offset: const Offset(0, 3),
                                ),
                              ],
                            ),
                            child: Stack(
                              children: [
                                Container(
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.all(20.0),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(10.0),
                                  ),
                                  child: Column(
                                    children: [
                                      Text(
                                        'Formule $ancienFormule',
                                        style: const TextStyle(
                                          fontFamily: 'merriweather',
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.black,
                                        ),
                                      ),
                                      const SizedBox(height: 5.0),
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            '$formulePrix € par an',
                                            style: const TextStyle(
                                              fontFamily: 'merriweather',
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.black,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
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
              ),
              const SizedBox(height: 10.0),
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
                          MaterialPageRoute(
                            builder: (context) => Accueil(
                              userNom: userNom,
                              formulePrix: formulePrix,
                              formuleNom: formuleNom,
                              userPrenom: userPrenom,
                            ),
                          ),
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
      ),
    );
  }
}
