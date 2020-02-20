const fetch = require("node-fetch");
const _ = require("lodash");
const { userURL, policyURL } = require("../config/config");

module.exports.getUserById = (req, res) => {
  return fetch(userURL)
    .then(data => data.json())
    .then(data => {
      const user = _.find(data.clients, { id: req.params.userId });
      if (user) return res.json(user);
      else return res.status(400).send("Bad request");
    })
    .catch(err => console.log(err));
};

module.exports.getUserByName = (req, res) => {
  return fetch(userURL)
    .then(data => data.json())
    .then(data => {
      const user = _.find(data.clients, { name: req.params.userName });
      if (user) return res.json(user);
      else return res.status(400).send("Bad request");
    })
    .catch(err => console.log(err));
};

module.exports.getUserByPolicyNumber = (req, res) => {
  return fetch(policyURL)
    .then(data => data.json())
    .then(data => _.find(data.policies, { id: req.params.policyNumber }))
    .then(policy => {
      if (policy)
        return fetch(userURL)
          .then(data => data.json())
          .then(data => res.json(_.find(data.clients, { id: policy.clientId })))
          .catch(err => console.log(err));
      else return res.status(400).send("Bad request");
    })
    .catch(err => console.log(err));
};
