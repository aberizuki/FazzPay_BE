const express = require("express");
const router = express();
const formUpload = require("../../helper(db)/formUpload");

const authController = require("../controller/controller_auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/users", authController.get);
router.get("/users/:id", authController.getDetail);
router.patch("/:id", formUpload.single("img"), authController.update);
router.patch("/users/:id", authController.update);

module.exports = router;
