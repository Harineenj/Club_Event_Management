const express = require("express");
const mongoose = require("mongoose");
const dotenv =  require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");


connectDB();

app.use("/api/students", studentRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/uploads", express.static("uploads"));




 const port = process.env.PORT;
 app.listen(port,()=>console.log(`server is running on the port ${port}`))