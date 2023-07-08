import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../assets/logo.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCache, removeCache } from "../utils/cache";

const drawerWidth = 240;
const useStyles = makeStyles({
  page: {
    background: "#f9f9f9",
    width: "100%",
    padding: "10px",
    height: "100vh",
  },
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    background: "var(--primary-color)",
    color: "white",
  },
  title: {
    padding: "10px",
    color: "var(--primary-color)",
    fontWeight: "bolder",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "var(--primary-color) !important",
  },
  date: {
    flexGrow: 1,
    color: "white",
  },
  avatar: {
    marginLeft: "10px",
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  menuWidth: {
    minWidth: 200,
  },
});

const Layout = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const jsonUser = getCache("user");
    if (jsonUser) {
      setUser(JSON.parse(jsonUser));
    }
  }, []);

  const handleLogout = () => {
    removeCache("user");
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Books",
      path: "/",
    },
    user.user?.role === "Librarian" && {
      text: "Create Book",
      path: "/create",
    },
    user.user?.role === "Librarian" && {
      text: "Show User lists",
      path: "/lists",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.date}>
            Library Management System
          </Typography>
          <div className={classes.avatarContainer} onClick={handleOpenUserMenu}>
            <Typography>
              {user && user.user?.name} ({user && user.user?.role})
            </Typography>
            <Avatar className={classes.avatar} src={logo} />
          </div>
        </Toolbar>
        <Menu
          sx={{ mt: "45px", minWidth: 200 }}
          className={classes.menuWidth}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleLogout}>
            <Typography
              textAlign="center"
              sx={{ color: "var(--primary-color)" }}
            >
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant="h5" className={classes.title}>
            Library
          </Typography>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              sx={{ cursor: "pointer" }}
              key={item.text}
              onClick={() => navigate(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div style={{ marginTop: "4rem" }}></div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
