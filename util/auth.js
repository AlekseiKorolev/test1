const fetch = require("node-fetch");
const _ = require("lodash");

module.exports = (req, res, next) => {
  fetch("http://www.mocky.io/v2/5808862710000087232b75ac")
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
      console.error("Authorization error ", err);
      return res.status(403).json(err);
    });
};
