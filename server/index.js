import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movie.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Initialize dotenv
dotenv.config();

// Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', movieRoutes);
app.use('/api/auth', authRoutes);

// Simple Route
app.get("/", (req, res) => {
  res.send("MERN Backend Server Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
