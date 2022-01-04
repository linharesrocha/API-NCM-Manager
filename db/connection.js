const mongoose = require("mongoose");
const dbName = 'ncmpanel'

// Fazendo conexão com o mongodb com mongoose
mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Retornando resposta da conexão
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
    console.log("Conectado ao MongoDB!");
});