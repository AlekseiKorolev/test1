const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const router = require("./routes/router");
const { PORT } = require("./config/config");

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

// start server
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));

module.exports = app;
