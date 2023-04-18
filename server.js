const express = require('express');
const bodyParser = require("body-parser");
const colors = require('colors');
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoutes");
const cors = require("cors");

// configure env
dotenv.config();

// database config
connectDB();

//rest object
const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

// middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute)

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to App</h1>");
})

//port
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, (req, res) => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});