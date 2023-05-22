import { UserModel } from "../model/User.js";
import crypto from 'crypto'

export default async function (req, res) {
    const sha256Hasher = crypto.createHmac("sha256", process.env.SECRET_HASH);
    const hash = sha256Hasher.update(req.body.password).digest("hex");
    const data = await UserModel.findOne({ email: req.body.email, password: hash });
    if(data){
        req.session.auth = true
    }
    res.redirect('/dashboard');
    return;
}
