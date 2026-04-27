import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import useAuth from "../context/Auth/AuthContext";
import { useState } from "react";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const { isAuthenticated, email, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#111" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              letterSpacing: "1px",
              color: "white",
            }}
          >
            TechStore
          </Typography>
        </Link>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <Typography sx={{ color: "#fff" }}>{email}</Typography>
              <IconButton sx={{ color: "#fff" }} onClick={handleOpen}>
                <SettingsIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ShoppingBagIcon fontSize="small" />
                  </ListItemIcon>
                  My Orders
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout();
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small"/>
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link to={"/login"}>
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
              </Link>
              <Link to={"/register"}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#00bcd4",
                    "&:hover": { backgroundColor: "#0097a7" },
                  }}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
