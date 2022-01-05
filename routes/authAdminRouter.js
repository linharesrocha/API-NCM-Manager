const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin")

// register an Admin
router.post("/register", async (req, res) => {

    const { name, user, password, confirmpassword } = req.body;

    // check for required fields
    if(user == null || password == null) {
        return res.status(400).json({error: "Por favor, preencha todos os campos!"});
    }

    // check if passwords match
    if (password != confirmpassword) {
        return res.status(400).json({error: "As senhas não conferem!" })
    }

    // check if admin exists
    const adminExists = await Admin.findOne({ user: user });
    if(adminExists) {
        return res.status(400).json({ error: "O administrador informado já está cadastrado!" });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // creating the admin object
    const objectAdmin = new Admin({
        name: name,
        user: user,
        password: passwordHash,
    });

    // saving to the database
    try {
        const newAdmin = await objectAdmin.save();

        // create token
        const token = jwt.sign(
            // payload
            {
                user: newAdmin.user,
                id: newAdmin._id
            },
            // secret
            "linux"
        );

        // return token
        res.json({error: null, msg: "Você realizou o cadastro com sucesso", token: token, userId: newAdmin._id});
    }catch(err) {
        res.status(400).json({ err });
    }
    
});

// Login Admin
router.post("/login", async (req, res) => {
    const { user, password } = req.body;

    // check if admin exists
    const admin = await Admin.findOne({ user: user })
    if(!admin) {
        return res.status(400).json({ error: "Não há administrador cadastrado com este usuário!" })
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, admin.password);
    if(!checkPassword) {
        return res.status(400).json({ error: "Senha inválida!" })
    }

    // create token
    const token = jwt.sign(
        //payload
        {
            user: admin.user,
            id: admin._id
        },
        //secret
        "linux"
    );

    // return token
    res.json({ error: null, msg: "Você está autenticado!", token: token, adminId: admin._id});


});

module.exports = router;