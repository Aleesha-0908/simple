const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const mongoose = require("mongoose");
const chats = require("./data/data");
//const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./Routes/userRoutes");

app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MOngodb"))
  .catch((err) => console.log(err));

mongoose.set("strictQuery", true);

// mongoose.connection.on("error", (err) => {
//   console.log("err", err);
// });
// mongoose.connection.on("connected", (err, res) => {
//   console.log("mongoose is connected");
// });

app.get("/", (req, res) => {
  res.send("API is running");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   //console.log(req.params.id);
//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat);
// });

app.use("/api/user", userRoutes);
app.use("/api/footer", footerRoutes);
const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server has started PORT`.yellow.bold));
