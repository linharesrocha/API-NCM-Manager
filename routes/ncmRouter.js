const router = require("express").Router();
const checkToken = require("../helpers/check-token-admin");
const getAdminByToken = require("../helpers/get-admin-by-token");
const NCM = require("../models/ncm");


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
        res.status(200).json({ error: null, msg: "Produto criado com sucesso!", Product: ncm, createdBy: user})

    }catch(err) {
        res.status(400).json({ error: "Não foi possível criar o produto!"})
    }

});

router.post("/delete-product", checkToken, async (req, res) => {
     
    const token = req.header("auth-token");
    const user = await getAdminByToken(token);
    
    // id ncm
    const { id } = req.body;

    // id creator ncm
    const userId = user._id.toString();

    try {
        await NCM.deleteOne({ _id: id });
        res.json({error: null, msg: "NCM removido com sucesso!", DeletedBy: user});
    }
    catch(err) {
        res.status(400).json({err: "Acesso negado, não foi possível remover o NCM!"})
    }

});


module.exports = router;