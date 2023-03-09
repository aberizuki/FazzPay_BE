const express = require("express");
const router = express();

const transactionController = require("../controller/controller_transaction");

router.post("/transfer", transactionController.add);

module.exports = router;
