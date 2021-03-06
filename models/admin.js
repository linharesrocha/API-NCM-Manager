const mongoose = require("mongoose");

// Criando o Shema
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

// Criando o Modelo Admin
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;