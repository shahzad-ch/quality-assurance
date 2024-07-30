const { MongoClient } = require("mongodb");
require('dotenv').config();


async function main(callback) {
    const URI = process.env.MONGO_URI_LOCAL;
    const client = new MongoClient(URI)
    
    try {
        await client.connect();
        console.log("Database connected")
        callback(client);
    }
    catch(err){
        console.erroe(err)
        throw new Error('Unable to connect to database')
    }

}

module.exports = main