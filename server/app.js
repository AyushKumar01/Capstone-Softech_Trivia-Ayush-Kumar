const express = require("express");
const loginRoute = require("./routes/loginRoutes");
const categoryRoute = require("./routes/categoryRoutes");
require('dotenv').config();
const { PORT, BACKEND_URL } = process.env;


const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/login", loginRoute);
app.use("/category", categoryRoute);
app.listen(PORT, console.log(`${BACKEND_URL}:${PORT}`));
