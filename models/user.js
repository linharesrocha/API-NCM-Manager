const mongoose = require("mongoose");

// Criadno Schema
const UserSchema = new mongoose.Schema({
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

// Criando o Modelo User
const User = mongoose.model("User", UserSchema);

module.exports = User;