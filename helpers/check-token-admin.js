const jwt = require("jsonwebtoken");

// middleware to validate token
const checkTokenAdmin = (req, res, next) => {

    const token = req.header("auth-token");
    if(!token) {
        return res.status(401).json({ error: "Acesso negado! Usuário sem token."});
    }

    // create jwt
    try{
        const payload = jwt.verify(token, "linux");

        // verify if user is an admin
        if(payload.admin == false) {
            return res.status(400).json({err: "Você não tem permissão!"})
        }
        
        req.admin = payload;
        next()

    }catch(err) {
        res.status(400).json({err: "O token é inválido!"});
    } 
    
};

module.exports = checkTokenAdmin;