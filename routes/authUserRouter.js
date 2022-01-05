const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/login", async (req, res) => {

    const { user, password } = req.body;

    //check if user exists
    const userObject = await User.findOne({ user: user });
    if(!useuserObjectr) {
        return res.status(400).json({ err: "Usuário não encontrado no sistema!"})
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, userObject.password);
    if(!checkPassword) {
        return res.status(400).json({err: "Senha inválida!"});
    }

    // create token
    const token = jwt.sign(
        // payload
        {
            user: userObject.name,
            id: userObject._id
        },
        // secret
        "linux"
    );

    // return token
    res.json({error: null, msg: "Você está autenticado!", token: token, userId: userObject._id});

});



module.exports = router;