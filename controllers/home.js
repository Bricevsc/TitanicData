import { UserModel } from "../model/User.js";
import argon2 from "argon2";
import Joi from "joi";


export default async function (req, res) {
    const { email, password } = req.body;

    const userLoginSchema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),

        password: Joi.string()
            .min(3)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required()
    })

    const { error } = userLoginSchema.validate(req.body, {
        abortEarly: false,
    });

    if (error)
        return res.status(406).send(error.details)


    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            const passwordVerify = await argon2.verify(user.password, password)
            if (passwordVerify) {
                req.session.auth = true;
                res.status(200).send({ auth: true })
            }
            else {
                res.status(401).send({ auth: false, error: "connection error: verify password or email" })
            }
        }
        else {
            res.status(401).send({ auth: false, error: "connection error: verify password or email" })
        }

    } catch (err) {
        res.status(500).send({ auth: false, error: err.message })
    }
}