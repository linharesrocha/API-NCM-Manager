// modules
const express = require('express');
const cors = require('cors');
const connection = require('./db/connection');

// routes require
const authAdminRouter = require('./routes/authAdminRouter');
const authUserRouter = require('./routes/authUserRouter');
const adminRouter = require('./routes/adminRouter');


// ejs
app.set("view engine", "ejs");

//static
app.use(express.static("public"));

// config 
const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/auth/admin", authAdminRouter);
app.use("/api/v1/auth/user", authUserRouter)
app.use("/api/v1/admin", adminRouter);

// listen
app.listen(port, () => {
    console.log(`O back-end está rodando na porta ${port}`);
});




