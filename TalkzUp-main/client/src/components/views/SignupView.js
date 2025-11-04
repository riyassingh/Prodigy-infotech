import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains } from "validator";
import { Link } from "react-router-dom";

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Must not contain spaces";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Must be a valid email address";
    }

    setErrors(errors);
    return errors;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ borderRadius: 3, p: 5 }}>
        <Stack spacing={3} alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              TalkzUp
            </Link>
          </Typography>

          <Typography variant="h5">Create Your Account</Typography>

          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
              Login
            </Link>
          </Typography>

          <Box component="form" onSubmit={handleSubmit} width="100%">
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              autoFocus
              required
              id="username"
              name="username"
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              required
              id="email"
              name="email"
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              fullWidth
              required
              margin="normal"
              autoComplete="new-password"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            {serverError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {serverError}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, borderRadius: 2, py: 1.5 }}
            >
              Sign Up
            </Button>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Copyright />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SignupView;
