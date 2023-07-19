// ignore_for_file: use_build_context_synchronously, no_logic_in_create_state

import 'package:flutter/material.dart';
import 'package:myperform/historiquefacture.dart';
import 'package:url_launcher/url_launcher.dart' as url_launcher;
import 'package:myperform/main.dart';
import 'package:myperform/infoperso.dart';

void launchURL(BuildContext context) async {
  const String url =
      'https://docs.google.com/document/d/1MpVJUEfARYsGHZtiH9ozwrWSFobgElCV/edit'; // Replace with the URL of your PDF
  final Uri uri = Uri.parse(url);

  if (await url_launcher.canLaunch(uri.toString())) {
    await url_launcher.launch(uri.toString());
  } else {
    showErrorDialog(context);
  }
}

void showErrorDialog(BuildContext context) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: const Text('Erreur'),
        content: const Text('Impossible de trouver le document.'),
        actions: [
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

class Accueil extends StatelessWidget {
  const Accueil(
      {Key? key,
      required this.userNom,
      required this.formulePrix,
      required this.formuleNom,
      required this.userPrenom})
      : super(key: key);
  final String userNom;
  final String formulePrix;
  final String formuleNom;
  final String userPrenom;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'MyPerform',
        theme: ThemeData(
          primarySwatch: Colors.red,
        ),
        home: _Accueil(
            title: 'Mon profil',
            userNom: userNom,
            formulePrix: formulePrix,
            formuleNom: formuleNom,
            userPrenom: userPrenom));
  }
}

class _Accueil extends StatefulWidget {
  final String title;
  final String userNom;
  final String formulePrix;
  final String formuleNom;
  final String userPrenom;

  const _Accueil(
      {required this.title,
      required this.userNom,
      required this.formulePrix,
      required this.formuleNom,
      required this.userPrenom});

  @override
  _AccueilState createState() => _AccueilState(
      userNom: userNom, formulePrix: formulePrix, userPrenom: userPrenom);
}

class _AccueilState extends State<_Accueil> {
  String formulePrix;
  final String formuleEngagement = "142";
  final String userNom;
  final String userPrenom;
  final String formuleNom = 'Performance';
  final String userMdp = '';

  String getFormuleText() {
    if (formuleNom == 'DUER') {
      return 'Formule réservée au TPE';
    } else if (formuleNom == 'Primo') {
      return '1 module au choix\nautre que le module action';
    } else if (formuleNom == 'Amélioration') {
      return '1 module au choix\n+ module Action';
    } else if (formuleNom == 'Performance') {
      return 'Anomalie ou Risque,\nSignalement, Audit, Action';
    } else if (formuleNom == 'Prévention') {
      return 'Risque, Accident,\nSignalement, Echéance, Aciton';
    } else if (formuleNom == 'Excellence') {
      return 'Accès à tous les modules';
    }

    return '';
  }

  _AccueilState({
    required this.userNom,
    required this.formulePrix,
    required this.userPrenom,
  }) {
    formulePrix = '180'; // Set the initial value of prix to 180
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
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
        leading: IconButton(
          icon: const Icon(Icons.account_circle),
          onPressed: () {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => ProfilPerso(
                  userPrenom: userPrenom,
                  formuleNom: formuleNom,
                  formulePrix: formulePrix,
                  userNom: userNom,
                  userMdp: userMdp,
                ),
              ),
            );
          },
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
                      width: 90,
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
                  height: 400,
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
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        'Bonjour ${userNom[0].toUpperCase()}${userNom.substring(1)}',
                        style: const TextStyle(
                          fontFamily: 'merriweather',
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      const SizedBox(height: 20.0),
                      Align(
                        alignment: Alignment.center,
                        child: Container(
                          width: 250,
                          height: 130,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10.0),
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
                                      'Formule ${widget.formuleNom}',
                                      style: const TextStyle(
                                        fontFamily: 'merriweather',
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.black,
                                      ),
                                    ),
                                    const SizedBox(height: 5.0),
                                    Text(
                                      getFormuleText(),
                                      textAlign: TextAlign.center,
                                      style: const TextStyle(
                                        fontFamily: 'merriweather',
                                        fontSize: 15,
                                        color: Colors.black,
                                      ),
                                    ),
                                    const SizedBox(height: 10.0),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        RichText(
                                          text: TextSpan(
                                            children: [
                                              TextSpan(
                                                text: formuleEngagement,
                                                style: const TextStyle(
                                                  fontFamily: 'merriweather',
                                                  fontSize: 15,
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              const TextSpan(
                                                text: ' Jours restants',
                                                style: TextStyle(
                                                  fontFamily: 'merriweather',
                                                  fontSize: 15,
                                                  color: Colors.black,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        const SizedBox(width: 15.0),
                                        Text(
                                          '$formulePrix €',
                                          style: const TextStyle(
                                            fontFamily: 'merriweather',
                                            fontSize: 15,
                                            color: Colors.black,
                                            fontWeight: FontWeight.bold,
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
                      const SizedBox(height: 25.0),
                      Container(
                        width: 250,
                        height: 60,
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
                        child: TextButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                builder: (context) => Facture(
                                  userPrenom: userPrenom,
                                  userNom: userNom,
                                  formulePrix: formulePrix,
                                  formuleNom: formuleNom,
                                  userMdp: userMdp,
                                ),
                              ),
                            );
                          },
                          style: ButtonStyle(
                            textStyle: MaterialStateProperty.all<TextStyle>(
                              const TextStyle(
                                color: Colors.black,
                                fontSize: 16.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.white),
                            foregroundColor:
                                MaterialStateProperty.all<Color>(Colors.black),
                          ),
                          child: const Text('Historique des factures'),
                        ),
                      ),
                      const SizedBox(height: 30.0),
                      TextButton(
                        onPressed: () {
                          launchURL(context);
                        },
                        style: ButtonStyle(
                          textStyle: MaterialStateProperty.all<TextStyle>(
                            const TextStyle(
                              color: Colors.black,
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          backgroundColor:
                              MaterialStateProperty.all<Color>(Colors.white),
                          foregroundColor:
                              MaterialStateProperty.all<Color>(Colors.black),
                        ),
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 5.0),
                          decoration: BoxDecoration(
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.2),
                                blurRadius: 6.0,
                                spreadRadius: 2.0,
                                offset: const Offset(0, 3),
                              ),
                            ],
                            borderRadius: BorderRadius.circular(10.0),
                            gradient: const LinearGradient(
                              colors: [
                                Color(0xFFBF360C),
                                Color(0xFFF57C00),
                                Color(0xFFBF360C),
                              ],
                              begin: Alignment.centerLeft,
                              end: Alignment.centerRight,
                            ),
                          ),
                          child: const Center(
                            child: Text(
                              'Télécharger la facture en PDF',
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 15.0),
                      TextButton(
                        onPressed: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const MyPerformConnect(),
                            ),
                          );
                        },
                        style: ButtonStyle(
                          textStyle: MaterialStateProperty.all<TextStyle>(
                            const TextStyle(
                              color: Colors.black,
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          backgroundColor: MaterialStateProperty.all<Color>(
                              const Color.fromARGB(255, 244, 2, 2)),
                          foregroundColor:
                              MaterialStateProperty.all<Color>(Colors.black),
                        ),
                        child: const Text(
                          'Deconnexion',
                          style: TextStyle(
                              color: Colors.white, fontWeight: FontWeight.bold),
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
