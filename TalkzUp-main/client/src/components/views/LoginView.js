import {
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import ErrorAlert from "../ErrorAlert";
import { loginUser } from "../../helpers/authHelper";
import Copyright from "../Copyright";

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
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
          <Typography variant="h5" gutterBottom>
            Login to Your Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Don’t have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign Up
            </Link>
          </Typography>

          <Box component="form" onSubmit={handleSubmit} width="100%">
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              required
              id="email"
              name="email"
              onChange={handleChange}
            />
            <TextField
              label="Password"
              fullWidth
              required
              margin="normal"
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
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
              Login
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

export default LoginView;
