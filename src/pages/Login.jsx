import { Container, Paper, TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const url = `https://dummyjson.com/users/filter?key=username&value=${username}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const userData = await response.json();
      console.log(userData);
      dispatch(userData?.users[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={2} sx={{ padding: 4 }}>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            name="username"
            placeholder="Username"
            required
            autoFocus
            fullWidth
          />
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
