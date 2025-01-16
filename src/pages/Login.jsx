import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useState } from "react";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default function Login() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;

    try {
      // Log in user by username
      const userResponse = await fetch(
        `https://dummyjson.com/users/filter?key=username&value=${username}`,
      );

      if (!userResponse.ok) {
        throw new Error(`Error: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      const user = userData?.users[0];

      if (!user) {
        setError("User not found.");
        throw new Error("User not found.");
      }

      //Fetch user data by id
      const detailsResponse = await fetch(
        `https://dummyjson.com/users/${user.id}`,
      );
      if (!detailsResponse.ok) {
        throw new Error(
          `Error fetching user details: ${detailsResponse.status}`,
        );
      }

      const userDetails = await detailsResponse.json();
      console.log(userDetails);

      dispatch(login(userDetails));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              mt: 8,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              gutterBottom
            >
              Sign In
            </Typography>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
