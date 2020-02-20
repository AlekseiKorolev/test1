const express = require("express");
const router = express.Router();

const auth = require("../config/auth");
const cache = require("../config/cache");

const ctrlUser = require("../controllers/userController");
const ctrlPolicy = require("../controllers/policyController");

router.get("/user/userId/:userId", cache(20000), ctrlUser.getUserById);
router.get("/user/userName/:userName", cache(20000), ctrlUser.getUserByName);
router.get(
  "/user/policyNumber/:policyNumber",
  auth,
  ctrlUser.getUserByPolicyNumber
);

router.get("/policies/:userName", auth, ctrlPolicy.getPoliciesByName);

module.exports = router;
