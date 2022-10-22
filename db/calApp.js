
const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();
// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

async function run() {
    try {
        await client.connect();
        db = client.db("calorie-tracker");
        db.collection("users").createIndex({ username: 1 }, { unique: true });
        console.log("successfully connect to mongodb");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

function getDb() {
    return db;
}

exports.run = run;
exports.getDb = getDb;