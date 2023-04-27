const createData = (db, collectionName, data, callback) => {
    const collection = db.collection(collectionName);
    collection.insertOne(data, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    });
  };

const readData = (db, collectionName, callback) => {
const collection = db.collection(collectionName);
collection.find({}).toArray((err, result) => {
    if (err) {
    console.log(err);
    } else {
    callback(result);
    }
});
};

const updateData = (db, collectionName, filter, update, callback) => {
    const collection = db.collection(collectionName);
    collection.updateOne(filter, update, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    });
  };

const deleteData = (db, collectionName, query, callback) => {
const collection = db.collection(collectionName);
collection.deleteOne(query, (err, result) => {
    if (err) {
    console.log(err);
    } else {
    callback(result);
    }
});
};
  
  