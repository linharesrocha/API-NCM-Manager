const router = require("express").Router();
const bcrypt = require("bcrypt");
const checkToken = require("../helpers/check-token-admin");

const User = require("../models/user");
const Admin = require("../models/admin");

router.post("/create-user", checkToken, async (req, res) => {

    const { name, user, password, confirmpassword } = req.body;

    // validations
    if(name == null || user == null || password == null || confirmpassword == null) {
        return res.status(400).json({ error: "Deve preencher todos os campos!"})
    }

    if(password != confirmpassword) {
        return res.status(400).json({ error: "As senhas não são iguais!" })
    }

    const checkAdminExists = await User.findOne({ user: user });
    if(checkAdminExists) {
        return res.status(400).json({ error: "Usuário já existe no sistema!", user: checkAdminExists })
    }
    
    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // creating de user object
    const objectUser = new User({
        name: name,
        user: user,
        password: passwordHash
    });

    // saving to the database
    try {
        const newUser = await  objectUser.save();
        res.json({ error:  null, msg: "Você realizou o cadastro de um usuário com sucesso!", user: newUser })

    }catch(err) {
        res.json({ error: true, msg: "Não foi possível realizar o cadastro do usuário!", error: err})   
    }
});

module.exports = router;