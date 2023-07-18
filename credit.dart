import 'package:flutter/material.dart';
import 'package:myperform/connect.dart';

class Credit extends StatelessWidget {
  const Credit({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyPerform',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: const CreditScreen(title: 'Crédit'),
    );
  }
}

class CreditScreen extends StatefulWidget {
  const CreditScreen({
    required this.title,
    Key? key,
  }) : super(key: key);

  final String title;

  @override
  CreditScreenState createState() => CreditScreenState();
}

class CreditScreenState extends State<CreditScreen> {
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
            const SizedBox(height: 100),
            Align(
              alignment: Alignment.center,
              child: Container(
                width: 300,
                height: 150,
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
                        child: Container(
                          width: 250,
                          height: 110,
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
                                child: const Column(
                                  children: [
                                    Text(
                                      'Nos développeurs',
                                      style: TextStyle(
                                        fontFamily: 'merriweather',
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.black,
                                      ),
                                    ),
                                    SizedBox(height: 5.0),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          'Maxime',
                                          style: TextStyle(
                                            fontFamily: 'merriweather',
                                            fontSize: 15,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.black,
                                          ),
                                        ),
                                        SizedBox(width: 10.0),
                                        Text(
                                          'Quentin',
                                          style: TextStyle(
                                            fontFamily: 'merriweather',
                                            fontSize: 15,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.black,
                                          ),
                                        ),
                                      ],
                                    ),
                                    Center(
                                        child: Text(
                                          'Dorian',
                                          style: TextStyle(
                                            fontFamily: 'merriweather',
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.black,
                                          ),
                                        ),
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
            Positioned(
              bottom: 180,
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
