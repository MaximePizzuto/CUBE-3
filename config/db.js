const { MongoClient } = require('mongodb');

const url = '-	mongodb://mongo:jm4olol80GlpAoW96wSw@containers-us-west-49.railway.app:5900'; // Replace with your MongoDB connection string
const dbName = 'your-database-name'; // Replace with your database name

let db;

async function connect() {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

function getDB() {
  return db;
}

module.exports = {
  connect,
  getDB,
};
