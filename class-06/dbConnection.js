const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

let db;

async function connectDB() {

    await client.connect();

    db = client.db("companydb");

    return db;

}

module.exports = connectDB;