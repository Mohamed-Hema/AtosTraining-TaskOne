// Creating Server
const express = require("express");
const PORT = 3000;
const User = require("./model/User");
// Grant access to the User's Data
const app = express();
app.use(express.json());

app.use("/api/auth", require("./Auth/Route"));


// Connect to the Database
const connectDB = require("./db");
connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`);
  });


  process.on("unhandledRejection", (err) => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1));
  });
