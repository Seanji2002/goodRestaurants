// /api/new-restaurant

import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
    console.log(req.body)
    if (req.method === 'DELETE') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://creater-jsy:test123@cluster0.mhkhd.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const restaurantsCollection = db.collection('restaurants');

        const obj = JSON.parse(data);

        const result = await restaurantsCollection.deleteOne({_id: ObjectId(obj._id)});

        client.close();

        res.status(201).json({message: 'Restaurant deleted!'});
    }
}

export default handler;