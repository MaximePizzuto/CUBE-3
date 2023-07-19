const deleteT = async (client, nameBase, nameElement) => {
    try {
      const database = client.db('mongonode');
      const titles = database.collection(nameBase);
      const result = await titles.deleteOne(nameElement);
      return result.deletedCount;
      
    } finally {
      await client.close();
    }
  }

module.exports = deleteT;