import { useState } from "react";
import { login as loginService } from "../../services/user";
import { Box, Button, Grid, Typography } from "@mui/material";
import Input from "../../components/global/Input";
import styles from "./LibrarianLogin.module.css";
import { Link } from "react-router-dom";

const LibrarianLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await loginService({ email, password });
    console.log(res);
  };

  return (
    <Box className={styles.main}>
      <Grid container className={styles.container}>
        <Grid item xs={4} className={styles.form}>
          <Typography variant={"h4"} className={styles.header}>
            Login Librarian
          </Typography>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            sx={{ marginBottom: "1rem" }}
            autoComplete="off"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            sx={{ marginBottom: "1rem" }}
            autoComplete="off"
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              float: "right",
              backgroundColor: "var(--primary-color)",
              marginBottom: "1rem",
            }}
            fullWidth
          >
            Login
          </Button>

          <Typography sx={{ textAlign: "center" }}>
            Are you a user? <Link to="/login">Sign in here</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LibrarianLogin;
