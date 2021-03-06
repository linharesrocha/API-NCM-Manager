const router = require("express").Router();
const checkTokenAdmin = require("../helpers/check-token-admin");
const getAdminByToken = require("../helpers/get-admin-by-token");
const NCM = require("../models/ncm");

router.get("/", checkTokenAdmin, async (req, res) => {

    try{
        const ncms = await NCM.find().sort([[ '_id', -1 ]]);
        res.json({error: null, ncms: ncms});
    }
    catch(err) {
        return res.status(400).json({ error: "Não foi possível retornar os NCM's!"});
    }
});

router.get("/:id", checkTokenAdmin, async (req, res) => {

    const { id } = req.params;

    try {
        const ncm = await NCM.findOne({ _id: id })
        return res.status(200).json({ error: null, msg: "Produto encontrado com sucesso!", data: ncm});
    }
    catch(err) {
        return res.status(400).json({error: "Não foi possível encontrar o produto."})
    }

});

router.post("/create-product", checkTokenAdmin, async (req, res) => {
    
    const token = req.header("auth-token");
    const user = await getAdminByToken(token);
    const userPayload = req.admin
    const { name, code, origem } = req.body;

    // validations
    if(name == null || code == null || origem == null) {
        return res.status(400).json({ error: "Os campos não podem ficar vazios!" })
    }

    const ncmObject = new NCM({
        name: name,
        code: code,
        origem: origem,
        createdby: user._id.toString(),
        //updatedby: user._id.toString()
    });

    try {
        const ncm = await ncmObject.save();
        res.status(200).json({ error: null, msg: "Produto criado com sucesso!", Product: ncm, createdBy: userPayload})

    }catch(err) {
        res.status(400).json({ error: "Não foi possível criar o produto!"})
    }

});

router.post("/delete-product", checkTokenAdmin, async (req, res) => {
     
    const userPayload = req.admin;
    
    // id ncm
    const { id } = req.body;

    // id creator ncm
    const userId = user._id.toString();

    try {
        await NCM.deleteOne({ _id: id });
        res.json({error: null, msg: "NCM removido com sucesso!", DeletedBy: userPayload});
    }
    catch(err) {
        res.status(400).json({err: "Acesso negado, não foi possível remover o NCM!"})
    }

});

router.put("/update-product", checkTokenAdmin, async (req, res) => {

    const { id, name, code, origem } = req.body;
    const token = req.header("auth-token");
    const user = await getAdminByToken(token);
    const userPayload = req.admin

    // validations
    if(name == "null" || code == "null" || origem == "null") {
        return res.status(400).json({ error: "Preencha pelo menos um campo!"})
    }

    // build ncm object
    const ncmObject = {
        name: name,
        code: code,
        origem: origem,
        updatedby: user._id.toString(),
    }

    try {
        // returns updated data
        const updatedNCM = await NCM.findOneAndUpdate({ _id: id}, {$set: ncmObject}, {new: true});
        res.status(200).json({ error: null, msg: "Produto atualizado com sucesso!", updatedBy: userPayload});
    }
    catch(err) {
        res.status(400).json({error: "Não foi possível atualizar o produto!"})
    }


});

module.exports = router;