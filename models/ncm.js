const mongoose = require("mongoose");

// Criando o Schema
const NcmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.ObjectId
    }
});

// Criando o Modelo NCM
 const NCM = mongoose.model('NCM', NcmSchema);

 module.exports = NCM;