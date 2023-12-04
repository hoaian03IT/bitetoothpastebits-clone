import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { engine } from "express-handlebars";

import { connectToDB } from "./src/config/db.js";
import { routes } from "./src/routes/index.js";

const app = express();
const port = 3001;
dotenv.config();

// connect to mongooseDB
connectToDB();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/resources/views");

routes(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}/`);
});
