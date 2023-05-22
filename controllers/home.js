export default function(req, res){
    let message = "Hello World !"
    res.render("home", { message });
}