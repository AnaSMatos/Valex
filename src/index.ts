import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import router from "./routes/index.js";
import { errorHandler } from "./errorHandler.js";

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})