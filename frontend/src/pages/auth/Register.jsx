import styles from "./Register.module.css";
import { useState } from "react";
import { createUser as registerService } from "../../services/user";
import { Box, Button, Grid, Typography } from "@mui/material";
import Input from "../../components/global/Input";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    const res = await registerService({ email, password });
    console.log(res);
  };

  return (
    <Box className={styles.main}>
      <Grid container className={styles.container}>
        <Grid item xs={4} className={styles.form}>
          <Typography variant={"h4"} className={styles.header}>
            Register User
          </Typography>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            sx={{ marginBottom: "1rem" }}
            autoComplete="off"
          />
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
            onClick={handleRegister}
            sx={{
              float: "right",
              backgroundColor: "var(--primary-color)",
              marginBottom: "1rem",
            }}
            fullWidth
          >
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have account? <Link to="/login">Sign in here</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
