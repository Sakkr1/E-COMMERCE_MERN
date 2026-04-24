import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Navbar = () => {
  return (
  <AppBar position="static" sx={{ backgroundColor: "#111" }}>
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: "bold",
            cursor: "pointer",
          letterSpacing: "1px",
        }}
      >
        TechStore
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
            "&:hover": { borderColor: "#00bcd4", color: "#00bcd4" },
          }}
        >
          Login
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00bcd4",
            "&:hover": { backgroundColor: "#0097a7" },
          }}
        >
          Sign Up
        </Button>
      </Box>

    </Toolbar>
  </AppBar>
  );
};

export default Navbar;