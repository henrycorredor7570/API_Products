import mongoose from "mongoose";
require('dotenv').config({path:'.env.test'});
const MONGO_TEST_URI = process.env.DB_URL;

if (!MONGO_TEST_URI) {
    throw new Error("DB_URL is not defined in the .env.test file");
}
//conectamos a la base de datos de pruebas:
export const connectTestDB = async () => {
    await mongoose.connect(MONGO_TEST_URI);
};

//desconectamos de la base de datos de pruebas:
export const disconnecTestDB = async () => {
    await mongoose.disconnect();
}