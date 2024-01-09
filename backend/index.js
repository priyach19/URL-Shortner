const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const connectDB = require("./db");
const cors = require("cors");

connectDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", require("./routes/userAuth"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
