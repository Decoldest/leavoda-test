import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import {
  Container,
  Paper,
  Typography,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Person,
  Home,
  Business,
  Phone,
  Email,
  Cake,
  Work,
} from "@mui/icons-material";

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

export default function Dashboard() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const {
    firstName,
    lastName,
    image,
    gender,
    address,
    age,
    company,
    email,
    phone,
  } = user;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Grid container spacing={15}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={image}
                alt="Profile Photo"
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {firstName} {lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {gender}
              </Typography>
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Home />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Address"
                    secondary={`${address.address}, ${address.city}, ${address.stateCode} ${address.postalCode}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Cake />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Age" secondary={age} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Employer Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Business />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Company" secondary={company.name} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Work />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Department"
                    secondary={company.department}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Title" secondary={company.title} />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Phone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Phone" secondary={phone} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Email />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary={email} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
