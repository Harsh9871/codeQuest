import express from "express";
import cluster from "cluster";
import os from "os";
import path from "path";
import cors from "cors";
import process from "process";
// Import configurations and database connection
import { port } from "./config/dotenvConfig.js";
import connectDB from "./db/dbConfig.js";
import { userRouter } from "./routes/userRoutes.js";

// Establish database connection
connectDB();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Serve static files for images
const __dirname = path.resolve();
const imagesPath = path.join(__dirname, "./src/asset/images");
app.use("/asset/images", express.static(imagesPath));

// Routes
app.use("/user", userRouter);

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running.`);

  // Fork workers for each CPU core
  const numCPUs = os.cpus().length;
  console.log(`Forking ${numCPUs} workers...`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker if it dies
  cluster.on("exit", (worker, _code, _signal) => {
    console.error(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Worker processes handle the application logic
  app.listen(port, () => {
    console.log(`Worker ${process.pid} started on port ${port}`);
  });

  // Root route for worker
  app.get("/", (req, res) => {
    res.send(`Hello from Worker ${process.pid}`);
  });
}
