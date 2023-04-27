//protocole http
const http = require('http');
//lecture html filestream
const fs = require('fs');
//mongodb
const MongoClient = require('mongodb').MongoClient;
const hostname = 'localhost'; // l'adresse IP à utiliser
const port = 8080; // le port à utiliser
const url = "mongodb+srv://maxime:o4UJMmvPEkEQErm2@mongonode.vi8f1bb.mongodb.net/?retryWrites=true&w=majority"; //url bdd
const dbName = 'mongonode'; //dbname

MongoClient.connect(url, (err, client) => {

    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
  
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('src/pages/index.html', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Erreur interne du serveur');
      } else {
        res.end(data);
      }
    });
  });

server.listen(port, hostname, () => {
  console.log(`Le serveur est lancé sur http://${hostname}:${port}/`);
});