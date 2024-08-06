const ProductController = require("../controllers/productController");
const express = require("express");

const router = express.Router();

router.get("/",ProductController.getProducts);
router.post("/",ProductController.createProduct);
router.put("/:id",ProductController.updateProduct);
router.delete("/:id",ProductController.deleteProduct);

module.exports = router;