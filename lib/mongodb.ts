import { Db, MongoClient } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient: MongoClient | null = null;
let database: Db | null = null;
typeof globalThis.XMLHttpRequest === 'function';

if (!process.env.NEXT_ATLAS_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

export async function connectToDatabase() {
    try {
        
        mongoClient = await (new MongoClient(uri, options)).connect();
        console.log("Connected to server localhost:3000");
        database = await mongoClient.db(process.env.NEXT_ATLAS_DATABASE);
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}