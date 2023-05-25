import dotenv from "dotenv";
import express from "express";
import router from "./routes/routes.js";
import route from "./routes/routes.js";
import session from "express-session";
import("./config/db.js");
import cors from "cors";

dotenv.config({ path: "config/.env" });

const { APP_HOSTNAME, APP_PORT, NODE_ENV, FRONT_END_URL, MONGO_SESSIONS_URL, APP_SECRET } = process.env;

const app = express();

const corsOptions = {
  origin: FRONT_END_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};
app.use(cors(corsOptions));

app.locals.pretty = NODE_ENV !== "production"; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  name: 'authentication',
  secret: APP_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 180 * 60 * 1000 } // on détermine la durée de vie de la session
}));



// app.use(
//   session({
//       name: "login",
//       secret: "alklkdin987hdjd",
//       resave: true,
//       saveUninitialized: true,
//   })
// );

// app.use(function (req, res, next) {
//   app.locals = {
//       title: "Login",
//       isAuth: req.session?.auth ? req.session.auth : false
//   };
//   next();
// });

app.use(router);
app.use("/", route);

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
