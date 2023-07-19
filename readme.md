Projet du CUBE #3 - Intégration web et mobile 


Applicaton mobile MyPerform. 

pubspec.yaml:

name: myperform
description: A new Flutter project.

version: 1.0.0+1

environment:
  sdk: '>=2.19.6 <3.0.0'

dependencies:
  flutter:
    sdk: flutter
  path_provider: ^2.0.15
  url_launcher: ^6.0.3
  logger: ^1.1.0
  mongo_dart: ^0.9.0
  cupertino_icons: ^1.0.2
  http: ^1.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
    

  flutter_lints: ^2.0.0

flutter:
  assets:
    - assets/images/cogelis.jpg
    - assets/images/myperform.png
    - assets/identifiants.txt

  uses-material-design: true

android:
  compileSdkVersion: 31
