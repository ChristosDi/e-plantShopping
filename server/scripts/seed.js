import { readFile } from "node:fs/promises";
import { MongoClient } from "mongodb";

const text = await readFile("data/plants.json", "utf8");
const data = JSON.parse(text);
console.log(`Read ${data.length} plants from the file`);

const client = new MongoClient(process.env.MONGODB_URI);

try {
    await client.connect();
    console.log("Connected to MongoDB");

    const plants = client.db("plantshop").collection("plants");

    const operations = data.map(plant =>({
        updateOne: {
            filter: { name: plant.name },
            update: { $set: plant },
            upsert: true,
        },
    }));

    const result = await plants.bulkWrite(operations);
    console.log( `New: ${result.upsertedCount} | Updated: ${result.modifiedCount} ` );
} finally{
    await client.close();
}
