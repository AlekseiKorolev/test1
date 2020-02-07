const fetch = require("node-fetch");
const _ = require("lodash");

exports.getUserById = (req, res) => {
  return fetch("http://www.mocky.io/v2/5808862710000087232b75ac")
    .then(data => data.json())
    .then(data => {
      const user = _.find(data.clients, { id: req.params.userId });
      if (user) return res.json(user);
      else return res.status(400).send("Bad request");
    })
    .catch(err => console.log(err));
};

exports.getUserByName = (req, res) => {
  return fetch("http://www.mocky.io/v2/5808862710000087232b75ac")
    .then(data => data.json())
    .then(data => {
      const user = _.find(data.clients, { name: req.params.userName });
      if (user) return res.json(user);
      else return res.status(400).send("Bad request");
    })
    .catch(err => console.log(err));
};

exports.getUserByPolicyNumber = (req, res) => {
  return fetch("http://www.mocky.io/v2/580891a4100000e8242b75c5")
    .then(data => data.json())
    .then(data => _.find(data.policies, { id: req.params.policyNumber }))
    .then(policy => {
      if (policy)
        return fetch("http://www.mocky.io/v2/5808862710000087232b75ac")
          .then(data => data.json())
          .then(data => res.json(_.find(data.clients, { id: policy.clientId })))
          .catch(err => console.log(err));
      else return res.status(400).send("Bad request");
    })
    .catch(err => console.log(err));
};
