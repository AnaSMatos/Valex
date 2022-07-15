import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);



app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})