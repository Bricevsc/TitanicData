import dotenv from "dotenv";
import express from "express";
import router from "./routes/routes.js";
import route from "./routes/routes.js";
import("./config/db.js");
import cors from "cors";

dotenv.config({ path: "config/.env" });

const { APP_HOSTNAME, APP_PORT, NODE_ENV, FRONT_END_URL } = process.env;

const app = express();

const corsOptions = {
  origin: FRONT_END_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
app.use(cors(corsOptions));

app.locals.pretty = NODE_ENV !== "production"; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use("/", route);

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
