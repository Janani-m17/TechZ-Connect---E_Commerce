const orderController = require("../controllers/orderController");
const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router();

router.post("/createorder",auth, orderController.createOrder)
router.get("/getorders",auth,orderController.getOrders)

module.exports = router;