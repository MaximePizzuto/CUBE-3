// const http = require("http");
// const fs = require('fs').promises;
// const host = 'localhost';
// const port = 8000;



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://maxime:VzQBmNUj1h4086ig@mongonode.vi8f1bb.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log(`Server is running on http://${host}:${port}`);
//   client.close();
// });



// const requestListener = function (req, res) {
//     fs.readFile(__dirname + "/index.html")
//         .then(contents => {
//             res.setHeader("Content-Type", "text/html");
//             res.writeHead(200);
//             res.end(contents);
//         })
//         .catch(err => {
//             res.writeHead(500);
//             res.end(err);
//             return;
//         });

// };


// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });

const http = require("http");
const fs = require('fs').promises;
const host = 'localhost';
const port = 8000;

//Decla Mongo
const { MongoClient } = require("mongodb");
// URI
const uri = "mongodb+srv://maxime:VzQBmNUj1h4086ig@mongonode.vi8f1bb.mongodb.net/?retryWrites=true&w=majority";
//Client
const client = new MongoClient(uri);
//fonction mongodb
async function run() {
  try {
    const database = client.db('mongonode');
    const film = database.collection('test');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'batman' };
    const title = await film.findOne(query);

    console.log(title);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); 
  }
}
run().catch(console.dir);

//HTML
const requestListener = function (req, res) {
    fs.readFile(__dirname + "/html/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.setHeader("Content-Type", "text/css");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });

};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`---------------------------------------------`);
    console.log(`Server is running on http://${host}:${port}`);
    console.log(`---------------------------------------------`);
});