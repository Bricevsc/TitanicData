import { UserModel } from "../model/User.js";
import crypto from 'crypto'

export default async function (req, res) {
    req.session.message = null
    if (req.body.email && req.body.password) {
        // si tous les champs sont pas rempli
        const data = await UserModel.findOne({ email: req.body.email });
        if (!data) {
            //si aucun user n'est deja crée avec cette email
            const sha256Hasher = crypto.createHmac("sha256", process.env.SECRET_HASH);
            const hash = sha256Hasher.update(req.body.password).digest("hex");
            await UserModel.create({ email: req.body.email, password: hash });
            res.redirect("/login");
            return;
        }
        //si il y a deja un user avec cette email
        req.session.message = "Email déjà existant."
        res.redirect("/");
        return;
    }
    // si tous les champs ne sont pas rempli
    req.session.message = "Veuillez remplir tout les champs."
    res.redirect("/");
    return;
}
