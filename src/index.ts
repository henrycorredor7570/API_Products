import app from "./app";
import mongoose from "mongoose";

require('dotenv').config({path:'.env.test'});
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.DB_URL;

if (!MONGO_URI) {
    throw new Error("DB_URL is not defined in the .env.test file");
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connect to DB...");
        app.listen(PORT, ()=> {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.error(`Error connecting to MongoDB: ${err}`);
        
    })
