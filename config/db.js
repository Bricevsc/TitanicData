import mongoose from "mongoose";

// ==========
// Connexion à mongoose
// =========

mongoose
  .connect(
    "mongodb+srv://" + process.env.DB_USER + "@form.ghmv5pa.mongodb.net/titanic"
  )
  .then(() => console.log("Connected to MongoDB"))