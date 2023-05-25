import { UserModel } from "../model/User.js";
import argon2 from "argon2";


export default async function (req, res) {

    try {
        const user = await UserModel.findOne({ email })
        // console.log({user})
        if (!user) {
            const hashPassword = await argon2.hash(password);
            // const user = { firstname, lastname, email, password }

            const user = new UserModel({ ...req.body, password: hashPassword })

            console.log('user =', user)
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
