import express from "express";
import mongoose from "mongoose";
import session from 'express-session';
import router from "./router/index.js";
import * as dotenv from 'dotenv'
import("./config/db.js");

dotenv.config()
//Démarrage express
const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "pug");

// récupérer les données post sous forme d'un JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        name: "login",
        secret: "alklkdin987hdjd",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(function (req, res, next) {
    app.locals = {
        title: "Login",
        isAuth: req.session?.auth ? req.session.auth : false
    };
    next();
});

app.use("/", router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});