const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
dotenv.config();

let database;

const initDb = async () => {
  if (database) {
    console.log('DB is already initialized');
    return database;
  }
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    database = client.db();
    return database;
  } catch (err) {
    throw err;
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};
