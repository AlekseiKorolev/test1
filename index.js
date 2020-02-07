const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 5000;
const app = express();

const auth = require("./util/auth");
const {
  getUserById,
  getUserByName,
  getUserByPolicyNumber
} = require("./handlers/user");
const { getPoliciesByName } = require("./handlers/policy");

// middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/api/user/userId/:userId", getUserById);
app.get("/api/user/userName/:userName", getUserByName);
app.get("/api/user/policyNumber/:policyNumber", auth, getUserByPolicyNumber);

app.get("/api/policies/:userName", auth, getPoliciesByName);

// start server
app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));

module.exports = app;
