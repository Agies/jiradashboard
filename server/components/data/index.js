const mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const uri = 'mongodb://guest:guest@ds127878.mlab.com:27878/ads-data';

export class DB {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }
  find(filter, projection) {
    var connection = null;
    return mongodb.connect(uri)
      .then(db => {
        connection = db;
        return db.collection(this.collectionName);
      })
      .then(collection => {
        var cursor = collection.find(filter);
        if (projection) {
          cursor = cursor.project(projection);
        }
        return cursor.toArray();
      })
      .then(null, error => {
        console.error(error);
      })
      .then(array => {
        connection.close();
        return array;
      });
  }
  save(data) {
    var connection = null;
    return mongodb.connect(uri)
      .then(db => {
        connection = db;
        return db.collection(this.collectionName);
      })
      .then(collection => {
        var promise = null;
        if (data._id) {
          data._id = new ObjectId(data._id);
          data.lastUpdate = new Date();
          promise = collection.updateOne({
            _id: data._id
          }, {
            $set: data
          }, {
            w: 1
          });
        } else {
          promise = collection.insertOne(data, {
            w: 1
          });
        }
        return promise;
      })
      .then(null, error => {
        console.error(error);
      })
      .then(result => {
        connection.close();
        return result;
      });
  }
  findAndUpdate(filter, data) {
    var connection = null;
    var updateOptions = {
      upsert: true,
      w: 1
    };
    data.lastUpdate = new Date();
    return mongodb.connect(uri)
      .then(db => {
        connection = db;
        return db.collection(this.collectionName);
      })
      .then(collection => collection.findOneAndUpdate(filter, {
        $set: data
      }, updateOptions))
      .then(null, error => {
        console.error(error);
      })
      .then(result => {
        connection.close();
        return result;
      });
  }
  update(filter, data) {
    var connection = null;
    var updateOptions = {
      multi: true,
      w: 1
    };
    return mongodb.connect(uri)
      .then(db => {
        connection = db;
        return db.collection(this.collectionName);
      })
      .then(collection => collection.updateMany(filter, {
        $set: data
      }, updateOptions))
      .then(null, error => {
        console.error(error);
      })
      .then(result => {
        connection.close();
        return result;
      });
  }
  delete(id) {
    var connection = null;
    var updateOptions = {
      w: 1
    };
    return mongodb.connect(uri)
      .then(db => {
        connection = db;
        return db.collection(this.collectionName);
      })
      .then(collection => collection.deleteOne({
        _id: new ObjectId(id)
      }, updateOptions))
      .then(null, error => {
        console.error(error);
      })
      .then(result => {
        connection.close();
        return result;
      });
  }
  insert(data) {
    var connection = null;
    return mongodb.connect(uri)
      .then(db => {
        connection = db;
        return db.collection(this.collectionName);
      })
      .then(collection => collection.insertOne(data))
      .then(null, error => {
        console.error(error);
      })
      .then(result => {
        connection.close();
        return result;
      });
  }
}
