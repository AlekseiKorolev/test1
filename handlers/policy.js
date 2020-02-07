const fetch = require("node-fetch");
const _ = require("lodash");

exports.getPoliciesByName = (req, res) => {
  return fetch("http://www.mocky.io/v2/5808862710000087232b75ac")
    .then(data => data.json())
    .then(data => _.find(data.clients, { name: req.params.userName }))
    .then(client =>
      fetch("http://www.mocky.io/v2/580891a4100000e8242b75c5")
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
