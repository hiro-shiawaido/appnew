// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// };

// let mongoClient = null;
// let database = null;

// if (!process.env.MONGODB_URI) {
//     throw new Error('Please add your Mongo URI to .env.local')
// }

// export async function connectToDatabase() {
//     try {
//         if (mongoClient && database) {
//             return { mongoClient, database };
//         }
//         if (process.env.NODE_ENV === "development") {
//             if (!global._mongoClient) {
//                 mongoClient = await (new MongoClient(uri, options)).connect();
//                 global._mongoClient = mongoClient;
//             } else {
//                 mongoClient = global._mongoClient;
//             }
//         } else {
//             mongoClient = await (new MongoClient(uri, options)).connect();
//         }
//         // original：database = await mongoClient.db(process.env.NEXT_ATLAS_DATABASE);
//         database = await mongoClient.db("sample_restaurants");
//         console.log("Just Connected")
//         return { mongoClient, database };
//     } catch (e) {
//         console.error(e);
//     }
// }