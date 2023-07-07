import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../assets/logo.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  {
    text: "Books",
    path: "/",
  },
  {
    text: "Create Book",
    path: "/create",
  },
  { text: "Show User lists", path: "/lists" },
];

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
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "var(--primary-color) !important",
  },
  date: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: "10px",
  },
});

const Layout = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

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
          <Typography>Mario (User)</Typography>
          <Avatar className={classes.avatar} src={logo} />
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Library
          </Typography>
        </div>

        {/* links/list section */}
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
        <div style={{ marginTop: "6%" }}></div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
