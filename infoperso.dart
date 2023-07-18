// ignore_for_file: file_names

/* ignore: file_names*/
import 'package:flutter/material.dart';
import 'package:myperform/accueil.dart';

class Perso extends StatelessWidget {
  const Perso(
      {Key? key,
      required this.userPrenom,
      required this.formulePrix,
      required this.formuleNom,
      required this.userMdp})
      : super(key: key);
  final String formulePrix;
  final String userPrenom;
  final String formuleNom;
  final String userMdp;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyPerform',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: _Perso(
        title: 'MyPerform',
        userPrenom: userPrenom,
        formulePrix: formulePrix,
        formuleNom: formuleNom,
        userMdp: userMdp,
      ),
    );
  }
}

class _Perso extends StatefulWidget {
  final String title;
  final String userPrenom;
  final String formulePrix;
  final String formuleNom;
  final String userMdp;

  const _Perso(
      {required this.title,
      required this.userPrenom,
      required this.formulePrix,
      required this.formuleNom,
      required this.userMdp});

  @override
  // ignore: no_logic_in_create_state
  _PersoState createState() => _PersoState(
      userPrenom: userPrenom,
      formulePrix: formulePrix,
      formuleNom: formuleNom,
      userMdp: userMdp);
}

class _PersoState extends State<_Perso> {
  final String userPrenom;
  final String formulePrix;
  final String formuleNom;
  final String ancienFormule = 'DUER';
  final String userNom = 'POP';
  final String userEmail = 'exemple@gmail.com';
  final String userSociety = 'exemple';
  final String userMdp;
  bool passToggle = true;

  void _toggleUserMdpVisibility() {
    setState(() {
      passToggle = !passToggle;
    });
  }

  _PersoState(
      {required this.userPrenom,
      required this.formulePrix,
      required this.formuleNom,
      required this.userMdp});
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
                  height: 350,
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
                      const Text(
                        'Mon Profil',
                        style: TextStyle(
                          fontFamily: 'merriweather',
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      const SizedBox(height: 30),
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            ListTile(
                              leading: const Icon(Icons.person,
                                  color: Color.fromRGBO(224, 86, 42, 1)),
                              title: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Mon Prénom',
                                    style: TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 15,
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromRGBO(224, 86, 42, 1),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  Text(
                                    '${userPrenom[0].toUpperCase()}${userPrenom.substring(1)}',
                                    style: const TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            ListTile(
                              leading: const Icon(Icons.people_alt,
                                  color: Color.fromRGBO(224, 86, 42, 1)),
                              title: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Mon Nom',
                                    style: TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 15,
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromRGBO(224, 86, 42, 1),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  Text(
                                    '${userNom[0].toUpperCase()}${userNom.substring(1)}',
                                    style: const TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            ListTile(
                              leading: const Icon(Icons.mail,
                                  color: Color.fromRGBO(224, 86, 42, 1)),
                              title: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Mon Email',
                                    style: TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 15,
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromRGBO(224, 86, 42, 1),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  Text(
                                    userEmail,
                                    style: const TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            ListTile(
                              leading: const Icon(
                                Icons.lock,
                                color: Color.fromRGBO(224, 86, 42, 1),
                              ),
                              title: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Mon Mdp',
                                    style: TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 15,
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromRGBO(224, 86, 42, 1),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  Text(
                                    passToggle ? '********' : userMdp,
                                    style: const TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black,
                                    ),
                                  ),
                                ],
                              ),
                              trailing: IconButton(
                                icon: Icon(
                                  passToggle
                                      ? Icons.visibility_off
                                      : Icons.visibility,
                                  color: Colors.grey,
                                ),
                                onPressed: _toggleUserMdpVisibility,
                              ),
                            ),
                            ListTile(
                              leading: const Icon(Icons.house,
                                  color: Color.fromRGBO(224, 86, 42, 1)),
                              title: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Mon Entreprise',
                                    style: TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 15,
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromRGBO(224, 86, 42, 1),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  Text(
                                    userSociety,
                                    style: const TextStyle(
                                      fontFamily: 'merriweather',
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
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
                              userPrenom: userPrenom,
                              formulePrix: formulePrix,
                              formuleNom: formuleNom,
                              userMdp: userMdp,
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
