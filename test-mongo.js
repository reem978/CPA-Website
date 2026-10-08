const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

async function testConnection() {
  try {
    await client.connect();
    console.log("MongoDB connection successful!");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
  } finally {
    await client.close();
  }
}

testConnection();