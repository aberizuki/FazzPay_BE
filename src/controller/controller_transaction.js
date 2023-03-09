const transactionModel = require("../model/model_transaction");

const transactionController = {
  add: (req, res) => {
    return transactionModel
      .add(req.body)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = transactionController;
