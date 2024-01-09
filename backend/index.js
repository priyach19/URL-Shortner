const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const connectDB = require("./db");
const cors = require("cors");
const Urls=require("./models/urls")
connectDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", require("./routes/userAuth"));
app.use("/api", require("./routes/apiRoutes"));

//to get original url from short url
app.get("/:id", async (req, res) => {
  const ID = req.params.id;
  console.log(ID);
  const url = await Urls.findOne({ compressedcode: ID });
  url.visited++
  url.save()
  return res.redirect(url.originalURL);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
