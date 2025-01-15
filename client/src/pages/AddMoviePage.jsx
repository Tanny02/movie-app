import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMoviePage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false); // To track success state
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    rating: "",
    link: "",
    file: null, // Store file object
    imagePreview: null, // Store image preview URL
  });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Cleanup object URL
    return () => {
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input is for the rating, ensure it has no more than one decimal point.
    if (name === "rating") {
      // Prevent the user from entering more than one decimal point.
      const regex = /^(\d+(\.\d{0,1})?)?$/; // Matches up to one decimal point

      if (
        regex.test(value) &&
        (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 10))
      ) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleClearImage = () => {
    setFormData((prev) => ({ ...prev, imagePreview: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      isNaN(formData.rating) ||
      formData.rating < 0 ||
      formData.rating > 10 ||
      !/^\d(\.\d{1})?$/.test(formData.rating) // Ensure no more than one decimal point
    ) {
      alert(
        "Please enter a valid rating between 0 and 10, with one decimal place."
      );
      return;
    }

    if (
      !formData.title ||
      !formData.year ||
      !formData.rating ||
      !formData.link ||
      !formData.file
    ) {
      alert("Please fill in all the fields, including the image!");
      return;
    }

    // Validate year
    if (!/^\d{4}$/.test(formData.year)) {
      alert("Please enter a valid year (e.g., 2023).");
      return;
    }

    // Validate rating (between 0 and 10)
    if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
      alert("Please enter a valid rating between 0 and 10.");
      return;
    }

    // Validate URL
    try {
      new URL(formData.link); // Check if it's a valid URL
    } catch (e) {
      alert("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("year", formData.year);
      form.append("rating", formData.rating);
      form.append("link", formData.link);
      form.append("file", formData.file); // Appending file to FormData

      const response = await axios.post(
        "http://localhost:5000/api/movies/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Corrected Bearer token format
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Movie added successfully:", response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/edit");
      }, 2000);
    } catch (error) {
      setError("Error creating movie");
      console.error("Error creating movie:", error);
    } finally {
      setLoading(false);
    }
  };

   if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <CircularProgress />
        </Box>
      );
    }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      p={2}
      bgcolor="#f5f5f5"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth="800px"
        width="100%"
        bgcolor="white"
        boxShadow={3}
        p={4}
        borderRadius={2}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Add New Movie
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
              type="number" // For year validation
            />
            <TextField
              fullWidth
              label="Rating (0-10)"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
              type="number" // For rating validation
            />
            <TextField
              fullWidth
              label="Link (URL)"
              name="link"
              value={formData.link}
              onChange={handleChange}
              variant="outlined"
              required
              margin="normal"
              type="url" // For URL validation
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            {formData.imagePreview ? (
              <Box
                position="relative"
                width="100%"
                height={isSmallScreen ? "150px" : "200px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid #ccc"
                borderRadius={2}
                overflow="hidden"
              >
                <img
                  src={formData.imagePreview}
                  alt="Selected"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  size="small"
                  onClick={handleClearImage}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <Box
                width="100%"
                height={isSmallScreen ? "150px" : "200px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px dashed #ccc"
                borderRadius={2}
                sx={{ cursor: "pointer" }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-image"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="upload-image">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <UploadIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                    <Typography variant="body2" color="textSecondary">
                      Upload Image
                    </Typography>
                  </Box>
                </label>
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ height: "50px", fontSize: "1.2rem" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Movie"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Movie created successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={error !== null}
        autoHideDuration={3000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error || "An unexpected error occurred."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddMoviePage;
