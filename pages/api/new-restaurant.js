// /api/new-restaurant

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://creater-jsy:test123@cluster0.mhkhd.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const restaurantsCollection = db.collection('restaurants');

        const result = await restaurantsCollection.insertOne(JSON.parse(data));

        client.close();

        res.status(201).json({message: 'Restaurant inserted!'});
    }
}

export default handler;