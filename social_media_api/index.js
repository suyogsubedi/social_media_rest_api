const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
// Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Initializing dotenv
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to mongodb");
  }
);
app.get("/", (req, res) => {
  res.send("Hello");
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// This will ensure that whenever we get to this route our userRoute will be used
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.listen(8000, () => {
  console.log("Server is runningss");
});
