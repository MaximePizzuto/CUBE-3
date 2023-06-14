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
    
    async create (nameBase, nameElement, desc) {
        try {
         const database = this.client.db('mongonode');
         const titles = database.collection(nameBase);
         const doc = { title: nameElement, description: desc };
         const result = await titles.insertOne(doc);
         console.log(`A document was inserted with the _id: ${result.insertedId}`,);
        } finally {
          await this.client.close();
        }
      }
  
    async read(nameBase, nameElement) {
        try {
          const database = this.client.db('mongonode');
          const titles = database.collection(nameBase);
          const query = {title: nameElement};
          const title = await titles.findOne(query);
          console.log(title);
        } finally {
          await this.client.close();
        }
      }
  
    async update(newName) {
      this.name = newName;
    }

    async delete(nameBase, nameElement) {
        try {
          await this.client.connect();
          const database = this.client.db('mongonode');
          const titles = database.collection(nameBase);
          const result = await titles.deleteOne(nameElement);
          return result.deletedCount;
          
        } finally {
          await this.client.close();
        }
      }
  }

module.exports = MongoCRUD;


