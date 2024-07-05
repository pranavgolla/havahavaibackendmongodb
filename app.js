const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGO_URI;

let client;
let db;

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(); // Select the database to use
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToMongoDB();

// Route to fetch data from MongoDB
app.get('/airports', async (req, res) => {
    try {
        const collection = db.collection('airports'); // Use your collection name
        const airports = await collection.find({}).toArray();
        res.json(airports);
    } catch (err) {
        console.error('Error fetching airports:', err);
        res.status(500).send('Error fetching airports');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
