const router = require("express").Router();
const bcrypt = require("bcrypt");
const checkToken = require("../helpers/check-token-admin");
const getAdminByToken = require("../helpers/get-admin-by-token");

const User = require("../models/user");
const NCM = require("../models/ncm");

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
        password: passwordHash,
    });

    // saving to the database
    try {
        const newUser = await  objectUser.save();
        res.json({ error:  null, msg: "Você realizou o cadastro de um usuário com sucesso!", user: newUser })

    }catch(err) {
        res.json({ error: true, msg: "Não foi possível realizar o cadastro do usuário!", error: err})   
    }
});

router.post("/create-product", checkToken, async (req, res) => {
    
    const token = req.header("auth-token");
    const user = await getAdminByToken(token);

    const { name, code, origem } = req.body;

    // validations
    if(name == null || code == null || origem == null) {
        return res.status(400).json({ error: "Os campos não podem ficar vazios!" })
    }

    const ncmObject = new NCM({
        name: name,
        code: code,
        origem: origem,
        adminId: user._id.toString()
    });

    try {
        const ncm = await ncmObject.save();
        res.status(200).json({ error: null, msg: "Produto criado com sucesso!", product: ncm})

    }catch(err) {
        res.status(400).json({ error: "Não foi possível criar o produto!"})
    }

});

module.exports = router;