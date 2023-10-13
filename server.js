const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { connect } = require("mongoose");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

// Calling connectdb in the server
connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Parser for taking in the data stream
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// making use of error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

