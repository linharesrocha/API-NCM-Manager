const mongoose = require("mongoose");

// Criando o Shema
const AdminSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: true,
    }

});

// Criando o Modelo Admin
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;