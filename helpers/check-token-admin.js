const jwt = require("jsonwebtoken");

// middleware to validate token
const checkToken = (req, res, next) => {

    const token = req.header("auth-token");
    if(!token) {
        return res.status(401).json({ error: "Acesso negado! Usuário sem token."});
    }

    try{
        const verified = jwt.verify(token, "linux");

        // verify if user is an admin
        if(verified.admin == false) {
            return res.status(400).json({err: "Você não tem permissão!"})
        }
        
        req.user = verified;
        next()

    }catch(err) {
        res.status(400).json({err: "O token é inválido!"});
    } 
    
};

module.exports = checkToken;