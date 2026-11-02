import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use("/images", express.static("images"));
const PORT = process.env.PORT?? 3000;

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
console.log("Connected to MongoDB");

const plants = client.db("plantshop").collection("plants");

app.get("/api/health", (req,res) => {
    res.json({ status: "ok"});
});

app.get("/api/plants", async (req, res) => {
    const allPlants = await plants.find().toArray();
    res.json(allPlants);
});

app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});