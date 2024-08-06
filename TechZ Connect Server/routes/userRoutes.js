const UserController = require("../controllers/userController")
const express = require("express");

const router = express.Router();

router.post("/signup",UserController.signUp);
router.post("/login",UserController.login);

module.exports = router;