import { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
//import "../styles/register.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Field, PassField } from "../components/Fields";

const Register = () => {
  const history = useHistory();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    username: "",
    age: "",
    gender: "",
    name: { first: "", last: "" },
  });

  const handleChange = (key) => (e) => {
    if (key === "first" || key === "last")
      setRegister({
        ...register,
        name: { ...register.name, [key]: e.target.value },
      });
    else setRegister({ ...register, [key]: e.target.value });
  };
  const submit = async (action) => {
    if (action === "cancel") return history.push("/");
    const url = "http://127.0.0.1:3000/user/register";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    };
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="register">
      <form>
        <h1>register</h1>
        <Stack
          spacing={{ xs: 0.5, sm: 2 }}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
        >
          <Field
            name="first"
            value={register.name}
            onChange={handleChange("first")}
            label="first name"
            size="small"
          />
          <Field
            name="last"
            value={register.name}
            onChange={handleChange("last")}
            label="last name"
            size="small"
          />
        </Stack>
        <Field
          name="username"
          value={register}
          onChange={handleChange("username")}
          size="small"
        />
        <Stack
          spacing={{ xs: 0.5, sm: 2 }}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
        >
          <Field
            name="age"
            type="number"
            value={register}
            onChange={handleChange("age")}
            size="small"
          />
          <Autocomplete
            value={register.gender}
            onChange={(e, value) => setRegister({ ...register, gender: value })}
            fullWidth
            size="small"
            options={["male", "female", ""]}
            renderInput={(params) => <TextField {...params} label="gender" />}
          />
        </Stack>
        <Field
          name="email"
          value={register}
          onChange={handleChange("email")}
          size="small"
        />
        <PassField
          value={register}
          onChange={handleChange("password")}
          size="small"
        />
        <Stack spacing={2} direction="row" mt={2}>
          <Button
            size="large"
            variant="contained"
            fullWidth={true}
            onClick={submit}
          >
            sign up
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="error"
            onClick={() => submit("cancel")}
          >
            cancel
          </Button>
        </Stack>
        <Stack mt={2}>
          <p>
            already have account ? then <Link to="/login">sign in</Link>
          </p>
        </Stack>
      </form>
    </div>
  );
};

export default Register;
