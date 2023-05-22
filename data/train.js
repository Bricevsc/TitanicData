import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();
// const { DB_PASSWORD, DB_NAME, DB_LOGIN, DB_PORT } = process.env;

export async function connect() {
  const conn = await mongoose.connect(`mongodb://localhost:27017/titanic`, {
    // dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
