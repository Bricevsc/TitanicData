import { UserModel } from "../model/User.js";
import argon2 from "argon2";

export default async function (req, res) {
  try {
    const { lastname, firstname, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      const hashPassword = await argon2.hash(password);
      // const user = { firstname, lastname, email, password }

      const user = new UserModel({ ...req.body, password: hashPassword });

      console.log("user =", user);
      await user.save();
      // await UserModel.create(user);
      console.log({ status: "user registered", mail: user.email });
      // res.redirect('/')
      res
        .status(201)
        .send({
          isRegistered: true,
          user: {
            id: user._id,
            firstname: user.firstName,
            lastname: user.lastName,
          },
        });
    } else {
      res.status(400).send({ error: "Error: Bad request" });
    }
  } catch (err) {
    res.status(500).json({ isRegistered: false, error: err.message });
  }
}
