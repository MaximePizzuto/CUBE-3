import 'package:flutter/material.dart';
import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;
import 'package:myperform/CGU.dart';
import 'package:myperform/accueil.dart';
import 'package:myperform/credit.dart';

Future<List<String>> readDatabase() async {
  final String data = await rootBundle.loadString('assets/identifiants.txt');
  final List<String> lines = data.split('\n');
  return lines;
}

class Connect extends StatelessWidget {
  final TextEditingController userNomController = TextEditingController();
  final TextEditingController userMdpController = TextEditingController();

  Connect({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MyPerform',
      home: _Connect(
        userNomController: userNomController,
        userMdpController: userMdpController,
      ),
    );
  }
}

class _Connect extends StatefulWidget {
  final TextEditingController userNomController;
  final TextEditingController userMdpController;

  const _Connect({
    Key? key,
    required this.userNomController,
    required this.userMdpController,
  }) : super(key: key);

  @override
  State<_Connect> createState() => _ConnectState();
}

class _ConnectState extends State<_Connect> {
  final String formulePrix = '';
  bool passToggle = true;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final FocusNode _userNomFocusNode = FocusNode();
  final FocusNode _userMdpFocusNode = FocusNode();

  void handleAuthentication(
      bool isAuthenticated, String userNom, String formulePrix) {
    if (isAuthenticated) {
      widget.userNomController.clear();
      widget.userMdpController.clear();
      Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => Accueil(
                  userNom: userNom,
                  formulePrix: formulePrix,
                )),
      );
    } else {
      debugPrint('Invalid credentials');
    }
  }

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      final database = await readDatabase();
      final userNom = widget.userNomController.text.trim().toLowerCase();
      final userMdp = widget.userMdpController.text.trim();

      bool isAuthenticated = false;

      for (var line in database) {
        final parts = line.split(':');
        if (parts.length == 2) {
          final storedUserNom = parts[0].trim();
          final storedUserMdp = parts[1].trim();

          if (userNom == storedUserNom && userMdp == storedUserMdp) {
            isAuthenticated = true;
            debugPrint('Match found');
            break;
          }
        }
      }

      handleAuthentication(isAuthenticated, userNom, formulePrix);
    }
  }

  void _toggleUserMdpVisibility() {
    setState(() {
      passToggle = !passToggle;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'MyPerform',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.black,
          ),
        ),
        backgroundColor: const Color.fromRGBO(225, 100, 20, 1.0),
      ),
      backgroundColor: const Color.fromRGBO(232, 182, 173, 1.0),
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
              Positioned(
                top: MediaQuery.of(context).size.height / 4,
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
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text(
                            "Bienvenue",
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 20,
                            ),
                          ),
                          RichText(
                            textAlign: TextAlign.center,
                            text: const TextSpan(
                              text: 'Connectez-vous\n',
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 20,
                              ),
                            ),
                          ),
                          const SizedBox(height: 20),
                          SizedBox(
                            height: 75,
                            width: 325,
                            child: TextFormField(
                              cursorColor:
                                  const Color.fromRGBO(230, 93, 43, 1.0),
                              focusNode: _userNomFocusNode,
                              keyboardType: TextInputType.emailAddress,
                              controller: widget.userNomController,
                              decoration: InputDecoration(
                                labelText: "Nom",
                                labelStyle: TextStyle(
                                  color: _userNomFocusNode.hasFocus
                                      ? Colors.grey
                                      : Colors.grey,
                                ),
                                border: const OutlineInputBorder(
                                  borderSide: BorderSide(color: Colors.grey),
                                ),
                                focusedBorder: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromRGBO(230, 93, 43, 1.0)),
                                ),
                                prefixIcon: Icon(
                                  Icons.boy,
                                  color: _userNomFocusNode.hasFocus
                                      ? const Color.fromRGBO(230, 93, 43, 1.0)
                                      : Colors.grey,
                                ),
                              ),
                              style: const TextStyle(
                                color:
                                    Colors.black, // Couleur du texte du champ
                              ),
                              validator: (value) {
                                if (value?.isEmpty ?? true) {
                                  return "Entrez votre nom";
                                }
                                return null;
                              },
                              onEditingComplete: () {
                                _userNomFocusNode.unfocus();
                                FocusScope.of(context)
                                    .requestFocus(_userMdpFocusNode);
                              },
                            ),
                          ),
                          const SizedBox(height: 5),
                          SizedBox(
                            height: 75,
                            width: 325,
                            child: TextFormField(
                              cursorColor:
                                  const Color.fromRGBO(230, 93, 43, 1.0),
                              focusNode: _userMdpFocusNode,
                              keyboardType: TextInputType.emailAddress,
                              controller: widget.userMdpController,
                              obscureText: passToggle,
                              decoration: InputDecoration(
                                labelText: "Mot de passe",
                                labelStyle: TextStyle(
                                  color: _userNomFocusNode.hasFocus
                                      ? Colors.grey
                                      : Colors.grey,
                                ),
                                border: const OutlineInputBorder(),
                                focusedBorder: const OutlineInputBorder(
                                  borderSide: BorderSide(
                                      color: Color.fromRGBO(230, 93, 43, 1.0)),
                                ),
                                prefixIcon: Icon(
                                  Icons.lock,
                                  color: _userMdpFocusNode.hasFocus
                                      ? const Color.fromRGBO(230, 93, 43, 1.0)
                                      : Colors.grey,
                                ),
                                suffixIcon: IconButton(
                                  icon: Icon(
                                    passToggle
                                        ? Icons.visibility_off
                                        : Icons.visibility,
                                    color: _userMdpFocusNode.hasFocus
                                        ? const Color.fromRGBO(230, 93, 43, 1.0)
                                        : Colors.grey,
                                  ),
                                  onPressed: _toggleUserMdpVisibility,
                                ),
                              ),
                              validator: (value) {
                                if ((value ?? '').isEmpty) {
                                  return "Enter votre mot de passe";
                                }
                                return null;
                              },
                              onEditingComplete: _submitForm,
                            ),
                          ),
                          const SizedBox(height: 10),
                          GestureDetector(
                            onTap: _submitForm,
                            child: Container(
                              height: 50,
                              decoration: BoxDecoration(
                                color: const Color.fromRGBO(230, 93, 43, 1.0),
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: const Center(
                                child: Text(
                                  "Connexion",
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const CGU()),
                              );
                            },
                            child: const Text(
                              "Condition générale d'utilisation",
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 10.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          const SizedBox(height: 5),
                          GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const Credit()),
                              );
                            },
                            child: const Text(
                              "Credit",
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 10.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
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
