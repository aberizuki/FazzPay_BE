const express = require("express");
// const verifyToken = require("../../helper(db)/verifyToken");
const router = express();

const historyController = require("../controller/controller_history");

router.get("/history", historyController.get);
router.get("/history/:id", historyController.getHistoryById);
router.post("/history", historyController.add);
router.patch("/history/:id", historyController.update);
router.delete("/history/:id", historyController.remove);

module.exports = router;
