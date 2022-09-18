// /api/new-restaurant

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(process.env.MONGO_DB);
        const db = client.db();

        const restaurantsCollection = db.collection('restaurants');

        const result = await restaurantsCollection.insertOne(JSON.parse(data));

        client.close();

        res.status(201).json({message: 'Restaurant inserted!'});
    }
}

export default handler;