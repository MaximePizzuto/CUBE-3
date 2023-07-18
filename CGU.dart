import 'package:flutter/material.dart';
import 'package:myperform/connect.dart';

class CGU extends StatelessWidget {
  const CGU({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyPerform',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: const _CGUScreen(title: 'Condition général d\'utilisation'),
    );
  }
}

class _CGUScreen extends StatefulWidget {
  const _CGUScreen({
    required this.title,
    Key? key,
  }) : super(key: key);

  final String title;

  @override
  _CGUScreenState createState() => _CGUScreenState();
}

class _CGUScreenState extends State<_CGUScreen> {
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
                  child: const SingleChildScrollView(
                    child: Column(
                      children: [
                        Text(
                          "1. Utilisation de l'Application",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "1.1. Vous devez avoir au moins l'âge légal pour utiliser l'Application conformément aux lois en vigueur dans votre pays de résidence. Si vous êtes mineur, vous devez obtenir le consentement de vos parents ou tuteurs légaux avant d'utiliser l'Application.\n1.2. Vous êtes seul responsable de votre utilisation de l'Application. Vous devez utiliser l'Application de manière légale et en respectant les droits des autres utilisateurs.\n1.3. Vous ne devez pas utiliser l'Application d'une manière qui pourrait compromettre la sécurité ou l'intégrité de l'Application ou des systèmes qui y sont associés.",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 15.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10.0),
                        Text(
                          "2.	Compte utilisateur",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "2.1. Pour accéder à certaines fonctionnalités de l'Application, vous devrez créer un compte utilisateur. Vous devez fournir des informations exactes, complètes et à jour lors de la création de votre compte.\n2.2. Vous êtes responsable de la confidentialité de votre compte utilisateur et de tout mot de passe associé. Vous êtes entièrement responsable de toutes les activités effectuées sous votre compte utilisateur.",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 15.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10.0),
                        Text(
                          "3.	Propriété intellectuelle",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "3.1. Tous les droits de propriété intellectuelle relatifs à l'Application et à son contenu (y compris, sans s'y limiter, les textes, les graphiques, les logos, les images, les vidéos, les sons, les compilations de données et le code source) appartiennent à Cogelis ou à ses concédants de licence.\n3.2. Vous n'êtes pas autorisé à copier, modifier, distribuer, vendre ou exploiter de quelque manière que ce soit le contenu de l'Application sans autorisation préalable écrite de Cogelis.",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 15.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10.0),
                        Text(
                          "4.	Données personnelles",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "4.1. Lorsque vous utilisez l'Application, des données personnelles peuvent être collectées et traitées conformément à notre Politique de Confidentialité. Veuillez lire attentivement la Politique de Confidentialité pour comprendre comment nous collectons, utilisons, divulguons, conservons et protégeons vos données personnelles.",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 15.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10.0),
                        Text(
                          "5.	Responsabilités et limites de responsabilité",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 17.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          "5.1. L'Application est fournie 'telle quelle' et 'selon disponibilité'. Cogelis ne garantit pas que l'Application sera exempte d'erreurs ou de défauts, ou que son utilisation sera ininterrompue.\n5.2. Cogelis décline toute responsabilité pour tout dommage direct, indirect, accessoire, spécial, consécutif ou exemplaire découlant de votre utilisation de l'Application ou de l'impossibilité de l'utiliser, même si Cogelis a été informé de la possibilité de tels dommages.",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 15.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10.0),
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
      ),
    );
  }
}
