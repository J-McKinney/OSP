require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();

app.use(express.json());

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/products", require("./routes/productRoutes"));

// Error Handler should be last piece of Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res, next) => {
//   res.send("Api running");
// });

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
