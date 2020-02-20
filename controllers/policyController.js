const fetch = require("node-fetch");
const _ = require("lodash");
const { userURL, policyURL } = require("../config/config");

module.exports.getPoliciesByName = (req, res) => {
  return fetch(userURL)
    .then(data => data.json())
    .then(data => _.find(data.clients, { name: req.params.userName }))
    .then(client =>
      fetch(policyURL)
        .then(data => data.json())
        .then(data => {
          const policies = _.filter(data.policies, { clientId: client.id });
          if (policies) return res.json(policies);
          else return res.status(400).send("Bad request");
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err));
};
