import express from "express";
import routes_product from "./routes_product";

const app = express();

//Midelware para analizar informacion Json
app.use(express.json());

app.use("/productos", routes_product);

export default app;