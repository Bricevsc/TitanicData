import { UserModel } from "../model/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "underscore";

dotenv.config({ path: "config/.env" });

const { PRIVATE_KEY } = process.env;

export default async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const passwordVerify = await argon2.verify(user.password, password);
      if (passwordVerify) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName,
            type: "user",
          },
          PRIVATE_KEY,
          { expiresIn: "2h" }
        );
        res
          .status(200)
          .header("x-auth-token", token)
          .send(
            JSON.stringify(
              _.pick(user, ["_id", "firstname", "lastname", "email"])
            )
          );
        return;
      }
    }
    res.set("Access-Control-Expose-Headers", "x-auth-token");
    res
      .status(401)
      .send({
        auth: false,
        error: "connection error: verify password or email",
      });
  } catch (err) {
    res.status(500).send({ auth: false, error: err.message });
  }
}
