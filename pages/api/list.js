import { connectToDatabase } from "mongodb";

export default async function handler(request, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    const results = await collection.find({})
    .project({
            
    })
    .limit(3).toArray();

    response.status(200).json(results);

}