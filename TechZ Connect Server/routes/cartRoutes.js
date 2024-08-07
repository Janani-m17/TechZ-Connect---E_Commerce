const cartController = require("../controllers/cartController")
const express = require('express');
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/addtocart",auth,cartController.createCart);

module.exports = router;