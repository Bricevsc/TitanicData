import { response } from "express";
import { UserModel } from "../model/User.js";
import argon2 from "argon2";


export default async function (req, res) {
    const { email, password } = req.body;
    let errorMessages = []

    if (email.trim() === "" || password.trim() === "") {
        if (email.trim() === "")
            errorMessages.push('Email required !');
        if (password.trim() === "")
            errorMessages.push('Password required !');
        res.send({ errorMessages: errorMessages });
        return
    }


    try {
        const user = await UserModel.findOne({ email })
        const passwordVerify = await argon2.verify(user.password, password)
        if (passwordVerify) {
            req.session.auth = true;
            res.status(201).send({ ok: true, user })
        } else {
            errorMessages.push(`Invalid email or password`);
            res.send({ errorMessages: errorMessages })
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}