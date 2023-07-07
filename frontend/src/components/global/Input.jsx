/* eslint-disable react/prop-types */
import { TextField, styled } from "@mui/material";
import PropTypes from "prop-types";

const TextFieldStyled = styled(TextField)({
  "& label.Mui-focused": {
    color: "var(--primary-color)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--primary-color)",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "var(--primary-color)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
    },
  },
});

const Input = ({ value, onChange, ...props }) => {
  return (
    <TextFieldStyled
      value={value}
      onChange={onChange}
      variant="outlined"
      size="small"
      fullWidth
      {...props}
    />
  );
};

Input.prototype = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
