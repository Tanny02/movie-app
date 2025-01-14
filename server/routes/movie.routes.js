import express from "express";
import {
  getMovies,
  getSortedMovies,
  searchMovies,
  addMovie,
  editMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";
import { protect, protectAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.get("/movies", getMovies);
router.get("/movies/sorted", getSortedMovies);
router.get("/movies/search", searchMovies);

// Admin routes (protected)
router.post("/movies", protect, protectAdmin, addMovie);
router.put("/movies/:id", protect, protectAdmin, editMovie);
router.delete("/movies/:id", protect, protectAdmin, deleteMovie);

export default router;
