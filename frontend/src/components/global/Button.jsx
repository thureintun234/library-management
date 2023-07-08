import { Button as MuiButton } from "@mui/material";

const Button = (name, type = "button") => {
  return (
    <MuiButton
      type={type}
      variant="contained"
      component="span"
      sx={{ backgroundColor: "var(--primary-color)" }}
    >
      {name}
    </MuiButton>
  );
};

export default Button;
