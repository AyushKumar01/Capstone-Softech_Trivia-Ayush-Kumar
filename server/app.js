const express = require("express");
const loginRoute = require("./routes/loginRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const commentRoute = require("./routes/commentRoutes");
require('dotenv').config();
const { PORT, BACKEND_URL } = process.env;


const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/login", loginRoute);
app.use("/api/category", categoryRoute);
app.use("/api/comment", commentRoute);
app.listen(PORT, console.log(`${BACKEND_URL}:${PORT}`));
