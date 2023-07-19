const { MongoClient } = require('mongodb');
const databaseURL = process.env.DATABASE_URL;

class MongoCRUD {
    constructor() {
      this.uri = databaseURL;
      this.client = null;
    }
  
    async connect() {
      try {
        this.client = new MongoClient(this.uri);
        await this.client.connect();
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
    }
    

  }

module.exports = MongoCRUD;