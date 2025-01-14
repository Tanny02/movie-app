import Movie from "../models/movie.model.js";

// Get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

// Get sorted movies (by rating, name, etc.)
const getSortedMovies = async (req, res) => {
  const { sortBy } = req.query;

  try {
    let movies;
    if (sortBy) {
      movies = await Movie.find().sort({ [sortBy]: 1 });
    } else {
      movies = await Movie.find();
    }
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sorted movies", error });
  }
};

// Search movies by name or description
const searchMovies = async (req, res) => {
  const { query } = req.query;

  try {
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error searching movies", error });
  }
};

// Add new movie (admin only)
const addMovie = async (req, res) => {
  const { title, description, rating, releaseDate, duration } = req.body;

  try {
    const newMovie = new Movie({
      title,
      description,
      rating,
      releaseDate,
      duration,
    });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error });
  }
};

// Edit movie (admin only)
const editMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, rating, releaseDate, duration } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, description, rating, releaseDate, duration },
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};

// Delete movie (admin only)
const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};

export {
  getMovies,
  getSortedMovies,
  searchMovies,
  addMovie,
  editMovie,
  deleteMovie,
};
