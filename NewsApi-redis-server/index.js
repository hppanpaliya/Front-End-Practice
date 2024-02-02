import express from "express";
import axios from "axios";
import redis from "redis";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const apiKey = process.env.API_KEY;

const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.connect().then(() => { });

app.use(cors());

//serve static files

const __dirname = fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(path.join(__dirname, "public")));


app.get("*", (req, res) => {
    let inputUrl = req.url;
    let url = `https://newsapi.org${inputUrl}&apiKey=${apiKey}`;
    console.log(url);

    if (inputUrl === "/") {
        return res.json({ error: "No query provided" });
    }

    getNewsfromCache();

    async function getNewsfromCache() {
        try {
            const response = await client.get(`news:${inputUrl}`);
            if (response) {
                const responseJSON = JSON.parse(response);
                console.log(responseJSON, "from cache");
                return res.json(responseJSON);
            } else {
                getNews();
            }
        } catch (error) {
            return res.json({ error: error });
        }
    }
    
    async function getNews() {
        try {
            const response = await axios.get(url);
            const responseJSON = response.data;
            console.log(responseJSON);
            client.setEx(`news:${inputUrl}`, 3600, JSON.stringify({ source: "Redis Cache", ...responseJSON }));
            return res.json({ source: "API", ...responseJSON });
        } catch (error) {
            return res.json({ error: error });
        }
    }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
})