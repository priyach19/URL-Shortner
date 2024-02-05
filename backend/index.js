const express = require("express");
const app = express();
const dotenv = require('dotenv').config()
const port = process.env.PORT;
const connectDB = require("./db");
const cors = require("cors");

connectDB();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
