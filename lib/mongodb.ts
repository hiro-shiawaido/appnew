import { MongoClient, Db } from "mongodb";

const uri: string | undefined = process.env.NEXT_ATLAS_URI;
const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let mongoClient: MongoClient | null = null;
let database: Db | null = null;


if (!process.env.NEXT_ATLAS_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

declare global {
    var _mongoClient: MongoClient;
}

export async function connectToDatabase(): Promise<{ mongoClient: MongoClient; database: Db }> {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (process.env.VERCEL_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await new MongoClient(uri!, options).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await new MongoClient(uri!, options).connect();
        }
        console.log("Connected to server localhost:3000");
        database = await mongoClient.db(process.env.NEXT_ATLAS_DATABASE!);
        return { mongoClient: mongoClient!, database: database! };
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}