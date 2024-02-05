// Home controller for the URL Shortener
module.exports.home = function(req, res){
    return res.status(404).send({ message: "Welcome to URL Shortner" });
}