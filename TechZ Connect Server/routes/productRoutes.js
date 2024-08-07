const ProductController = require("../controllers/productController");
const express = require("express");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/",auth,ProductController.getProducts);
router.post("/",auth,ProductController.createProduct);
router.put("/:id",ProductController.updateProduct);
router.delete("/:id",ProductController.deleteProduct);

module.exports = router;