const express = require("express");
const { requireSignIn, isAdmin } = require("./../middlewares/authMiddleware");
const { getProductController, getSingleProductController, updateProductController, createProductController, productImageController, deleteProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController } = require("../controllers/productController");
const formidable = require("express-formidable");

const router = express.Router();

//routes

// create product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

// update product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

// get products
router.get('/get-product', getProductController);

// get single product
router.get('/get-product/:slug', getSingleProductController);

//get image
router.get("/product-image/:pid", productImageController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get('/braintree/token', braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController)

module.exports = router;