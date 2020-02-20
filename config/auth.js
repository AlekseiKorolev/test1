const fetch = require("node-fetch");
const _ = require("lodash");
const { userURL } = require("../config/config");

module.exports = (req, res, next) => {
  fetch(userURL)
    .then(data => data.json())
    .then(data => {
      let authorized = false;
      if (req.headers.user)
        authorized =
          _.find(data.clients, { name: req.headers.user }).role === "admin";
      if (authorized) return next();
      else return res.status(403).json({ err: "Unauthorized user" });
    })
    .catch(err => {
      return res.status(403).json(err);
    });
};
