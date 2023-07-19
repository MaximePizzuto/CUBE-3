const read = async (client, nameBase, nameElement) => {
    try {
    const database = client.db('mongonode');
    const titles = database.collection(nameBase);
    const query = {title: nameElement};
    const title = await titles.findOne(query);
    console.log(title);
    } finally {
      await client.close();
    }
  }

module.exports = read;