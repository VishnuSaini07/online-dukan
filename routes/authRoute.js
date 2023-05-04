const express = require("express");
const {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    getAllUsersController
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

//routing
//REGISTER || method post
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// forget passowrd || post
router.post("/forgot-password", forgotPasswordController);

// test routes
router.get('/test', requireSignIn, isAdmin, testController);

// protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController)

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController)

//order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

// all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

module.exports = router;