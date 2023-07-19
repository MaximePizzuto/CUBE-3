const create = async (client, nameBase, nameElement, desc) => {
    try {
     const database = client.db('mongonode');
     const titles = database.collection(nameBase);
     const doc = { title: nameElement, description: desc };
     const result = await titles.insertOne(doc);
     console.log(`A document was inserted with the _id: ${result.insertedId}`,);
    } finally {
      await client.close();
    }
  }

  module.exports = create;