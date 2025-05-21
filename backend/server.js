const express = require("express");
const mongoose = require("mongoose");
const dotenv =  require("dotenv");
const cors = require("cors");
const prometheus = require('prom-client');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



dotenv.config();


// Create a Registry to register metrics
const register = new prometheus.Registry();
prometheus.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

// Register the custom metrics
register.registerMetric(httpRequestDurationMicroseconds);

// Add middleware to measure request duration
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
  });
  next();
});

// Expose metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});




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