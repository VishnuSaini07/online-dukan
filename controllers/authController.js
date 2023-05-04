const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        //validations
        if (!name) {
            return res.send({ message: 'Name is required' });
        }
        if (!email) {
            return res.send({ message: 'Email is required' });
        }
        if (!password) {
            return res.send({ message: 'Password is required' });
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' });
        }
        if (!address) {
            return res.send({ message: 'Address is required' });
        } if (!answer) {
            return res.send({ message: 'Answer is required' });
        }

        //check user
        const existingUser = await userModel.findOne({ email });
        // exisiting user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register, please login',
            });
        }

        //Register user
        const hashedPassword = await hashPassword(password);
        //save password
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();

        res.status(200).send({
            success: true,
            message: 'User Register Successfully',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }
};


// post login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            });
        }

        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        });
    }
};

// forgot password
const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        //validation
        if (!email) {
            res.status(400).send({ message: 'Email is required' });
        }
        if (!answer) {
            res.status(400).send({ message: 'Answer is required' });
        }
        if (!newPassword) {
            res.status(400).send({ message: 'New Password is required' });
        }

        // check
        const user = await userModel.findOne({ email, answer });

        //validation
        if (!user) {
            res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            });
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong!",
            error
        });
    }
};

// test controller
const testController = (req, res) => {
    res.send('Protected route');
};

// update profile
const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);

        //password
        if (password && password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.password
        }, { new: true });
        res.status(200).send({
            success: true,
            message: "Profile updated successfully",
            updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error,
        });
    }
};

//orders
const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-image").populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getiing orders",
            error,
        });
    }
};

//all orders
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-image").populate("buyer", "name").sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getiing orders",
            error,
        });
    }
};

//order status update
const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating order",
            error
        });
    }
};

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({role: 0});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getiing users",
            error,
        });
    }
}

module.exports = { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsersController }; 