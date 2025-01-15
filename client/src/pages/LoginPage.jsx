import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import AuthContext for login
import EmailIcon from "@mui/icons-material/Email"; // Email Icon
import LockIcon from "@mui/icons-material/Lock"; // Lock Icon
import { Formik, Field, Form, ErrorMessage } from "formik"; // Import Formik components
import * as Yup from "yup"; // Import Yup for validation

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const { login } = useAuth(); // Use the login function from AuthContext
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(1, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setError(null);
    setLoading(true); // Start loading indicator

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        values
      );
      const { token, user } = response.data;

      // Store token in localStorage or cookies
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", user.role);

      // Update user in context
      login(user);

      // Redirect to dashboard or home
      if (user.role === "admin") {
        navigate("/edit");
      } else if (user.role === "user") {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop loading indicator after request
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 450 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Email Field */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    margin="normal"
                    value={values.email}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    }}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                  />
                </Grid>

                {/* Password Field */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={values.password}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <LockIcon sx={{ color: "action.active", mr: 1 }} />
                      ),
                    }}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={loading} // Disable button when loading
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Grid>
              </Grid>

              {/* Display error message */}
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Register link */}
              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    Register
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default LoginPage;
