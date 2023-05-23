import { UserModel } from "../model/User.js";
import argon2 from "argon2";


export default async function (req, res) {
    // why not use Joi ?
    const { firstname, lastname, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(emailRegex)) {
        console.log('email incorect');
        res.send({ firstname, lastname, email, password, errorMessage: 'Error: Invalid email' });
        return
    }


    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            const password = await argon2.hash(password);
            // const user = { firstname, lastname, email, password }

            const user = new UserModel({ ...req.body, password })
            await user.save()
            // await UserModel.create(user);
            console.log({ status: 'user registered', mail: user.email });
            // res.redirect('/')
            res.status(201).send({ ok: true, user })


            // try{
            //     //requesting....

            //     // <Redirect path="/" />
            // }
            // catch(err){
            //     //dealing with the error
            // }

            // const hash = await argon2.hash(password);
            // const user = { firstname, lastname, email, password: hash }
            // await UserModel.create(user);
            // console.log({ status: 'user registered', mail: user.email });
            // res.redirect('/')
        } else {

            res.status(400).send({ errorMessage: 'Error: Bad request' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}
