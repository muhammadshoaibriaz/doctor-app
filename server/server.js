const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const controllers = require("./routes/route");
const mongooseDatabase = require("../server/userDb");
const mongodb = require("../server/database/connect");
const cloudinary = require("cloudinary").v2;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

cloudinary.config({
  cloud_name: "doyux5mj8",
  api_key: "869138434164782",
  api_secret: "uOFk1ocUAqFDPRgAxJu3CRd4d4E",
});

app.use("/", controllers);
app.use("/uploads", express.static("uploads"));

// ------------------------------------- Practice start ------------------------------------

app.listen(PORT, async (req, res) => {
  try {
    mongooseDatabase;
    mongodb;
    console.log("Server is running on port ", PORT);
  } catch (error) {
    console.log("error connecting to the database: ", error);
  }
});

// ------------------------------------- Practice end --------------------------------------
