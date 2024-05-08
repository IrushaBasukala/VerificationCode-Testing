


const express = require("express");
const cors = require("cors");
const http = require("http");
const verificationRoutes = require("./routes/verificationRoute");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.use(cors({ Credential: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", verificationRoutes);

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});


