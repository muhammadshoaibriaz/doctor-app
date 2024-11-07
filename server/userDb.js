const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Connected ws");
  });

  ws.on("close", () => {
    console.log("Disconnected ws");
  });
});

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://ms0319255:1x7557mWWBmuXidw@doctor.hgd1eda.mongodb.net/Doctor?retryWrites=true&w=majority";

const connectToMongooseDb = async () => {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to mongoose database");
  } catch (error) {
    console.log("Error connecting to mongoose database", error);
  }
};

module.exports = connectToMongooseDb();
