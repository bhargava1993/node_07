require("dotenv").config();
const { MongoClient } = require("mongodb");

console.log("process.env.PORT-----",process.env.MONGO_URL)
const uri = process.env.MONGO_URL;

const client = new MongoClient(uri);

let db;

async function connectDB() {

    await client.connect();

    db = client.db("companydb");

    return db;

}

module.exports = connectDB;