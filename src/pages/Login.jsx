import { Container, Paper, TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

export default function Login() {
  const dispatch = useDispatch();

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
      console.log(userDetails)

      dispatch(login(userDetails));
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
