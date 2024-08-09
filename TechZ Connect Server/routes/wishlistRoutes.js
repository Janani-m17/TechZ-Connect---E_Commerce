const wishlistController = require("../controllers/wishlistController")
const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post("/addtowish/:id",auth,wishlistController.createWishlist);
router.delete("/removewish/:id",auth,wishlistController.deleteWishlist);
router.get("/getwishlist",auth,wishlistController.getWishlist);

module.exports = router;