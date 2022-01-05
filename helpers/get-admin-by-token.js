const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

// get admin by jwt token
const getAdminByToken = async(token) => {

    if(!token) {
        return res.status(401).json({ error: "Acesso negado!"});
    }

    // find admin
    const decoded = jwt.verify(token, "linux");

    const userId = decoded.id;

    const admin = await Admin.findOne({ _id: userId });

    return admin;
}




module.exports = getAdminByToken;