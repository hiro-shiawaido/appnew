import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(request: Request, response: Response) {
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

  const results = await collection.find({})
    .project({
      _id: 0,
    })
    .limit(3)
    .toArray();

  response.status(200).json(results);
}