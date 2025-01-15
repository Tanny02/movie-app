import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the context
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit Icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import the Delete Icon
import axios from "axios";

const MovieCard = ({ movie, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // This should come from AuthContext, assuming you're logged in as admin
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (movieId) => {
    // Toggle the confirmation prompt
    setDeleteId(movieId);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    // Call onDelete function passed as prop to delete the movie
    await onDelete(deleteId);
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        padding: 2, // Add padding to the card
      }}
    >
      {user.role === "admin" && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={() => navigate(`/update/${movie._id}`)}
            color="primary"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClick(movie._id)}
            color="secondary"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      {/* Conditionally Render Edit Icon - Only for Admins */}
      <img
        src={
          movie.image && movie.image.startsWith("http")
            ? movie.image // If it's a full URL
            : `https://movie-app-backend-cwps.onrender.com/uploads/${movie.image}` // If it's a local file
        }
        alt={movie.title}
        width="100%"
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Year: {movie.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.rating}
        </Typography>
      </CardContent>

      {/* Ensuring the "View Movie" button takes full width */}
      <Button
        href={movie.link}
        target="_blank"
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          bottom: 0, // Ensure it's at the bottom
          left: "50%", // Position it at the center
          transform: "translateX(-50%)", // Adjust for perfect centering
          width: "80%", // Set width to 80%
          marginTop: 2, // Some space from content
          marginBottom: 2, // Some space from content
          textAlign: "center", // Center the text inside the button
        }}
      >
        View Movie
      </Button>

      {/* Delete Confirmation Prompt */}
      {showConfirmDelete && (
        <>
          {/* Darkened overlay */}
          <Box
            sx={{
              position: "fixed", // Use fixed to cover the entire screen
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark background
              zIndex: 998, // Ensure this is behind the prompt box
            }}
          />

          {/* Confirmation prompt */}
          <Box
            sx={{
              position: "fixed", // Keep it fixed in the center
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Ensure it's centered
              backgroundColor: "rgb(255, 255, 255)",
              padding: 4, // Smaller padding for compactness
              borderRadius: 2,
              color: "black",
              zIndex: 999, // Ensure it appears on top of other elements
              width: "400px", // Limit width to make it small
              textAlign: "center", // Center the text inside the box
            }}
          >
            <Typography variant="h6" gutterBottom>
              Are you sure you want to delete this movie?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
              <Button variant="contained" onClick={handleCancelDelete}>
                Cancel
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
};

export default MovieCard;
