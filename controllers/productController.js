const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const orderModel = require("../models/orderModel");
const fs = require("fs");
const slugify = require("slugify");
const braintree = require("braintree");
const dotenv = require("dotenv");

dotenv.config();

//payment gatway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !description:
                return res.status(500).send({ error: 'Description is required' });
            case !price:
                return res.status(500).send({ error: 'Price is required' });
            case !category:
                return res.status(500).send({ error: 'Category is required' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' });
            case image && image.size > 16000000:
                return res.status(500).send({ error: 'image is required and sholud be less than 1 mb' });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) });
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }
        await product.save();
        res.status(200).send({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        });
    }
};

// get product
const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-image").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            countTotal: products.length,
            success: true,
            message: 'All Products',
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting product",
            error
        });
    }
};

//get single product
const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-image").populate("category");
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error
        });
    }
};

//product image
const productImageController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("image");
        if (product.image.data) {
            res.set("Content-type", product.image.contentType);
            return res.status(200).send(product.image.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting product image",
            error
        });
    }
};

//delete controller
const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error
        });
    }
};

//update product
const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !description:
                return res.status(500).send({ error: 'Description is required' });
            case !price:
                return res.status(500).send({ error: 'Price is required' });
            case !category:
                return res.status(500).send({ error: 'Category is required' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' });
            case image && image.size > 1000000:
                return res.status(500).send({ error: 'image is required and sholud be less than 1 mb' });
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (image) {
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }
        await product.save();
        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating product",
            error
        });
    }
};

// filters
const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
};

// product count
const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in product count",
            error
        });
    }
};

//product per page
const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        res.staus(400).send({
            success: false,
            message: 'Error in per page ctrl',
            error
        });
    }
};

// search product

const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in search product API",
            error
        });
    }
};

//similar product
const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-image").limit(4).populate("category");
        res.status(200).send({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting related products",
            error
        });
    }
};

const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate('category');
        res.status(200).send({
            success: true,
            category,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while getting products",
            error
        });
    }
};

//payment gateway api
//token
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//payment
const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((item) => {
            total += item.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createProductController, getProductController, getSingleProductController, productImageController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController };