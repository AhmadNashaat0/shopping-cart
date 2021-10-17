import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const Field = ({
  name,
  label,
  value,
  onChange,
  size = "normal",
  type,
  required = false,
}) => {
  return (
    <TextField
      fullWidth
      required={required}
      type={type}
      name={name}
      label={label ? label : name}
      value={value[name]}
      onChange={onChange}
      margin="dense"
      size={size}
    />
  );
};

const PassField = ({ name = "password", value, onChange, size = "normal" }) => {
  const [showPass, setShowPass] = useState(false);
  const togglePass = () => setShowPass(!showPass);
  return (
    <TextField
      fullWidth
      name={name}
      type={showPass ? "text" : "password"}
      label={name}
      value={value[name]}
      onChange={onChange}
      margin="dense"
      size={size}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePass}>
              {showPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export { Field, PassField };
