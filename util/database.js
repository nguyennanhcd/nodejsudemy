const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://levektor74:Zxcvbnm123@cluster0.csfs5va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
    .then((client) => {
      _db = client.db();
      console.log('Connected !!!');
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) return _db;
  throw new Error('No database connection');
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
