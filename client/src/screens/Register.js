import React, { useState } from "react";
// eslint-disable-next-line
import { Redirect, useHistory, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Field, PassField } from "../components/Fields";
import * as yup from "yup";

const Register = () => {
  const history = useHistory();
  const [register, setRegister] = useState({
    name: { first: "", last: "" },
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const validate = (value) => {
    Object.keys(value).forEach((key) => value[key] === "" && delete value[key]);
    console.log(value);
    const schema = yup.object().shape({
      name: yup.object().shape({
        first: yup
          .string()
          .required("First Name is Required.")
          .min(2, "Username should be 8 chars minimum."),
        last: yup
          .string()
          .required("Last Name is Required.")
          .min(2, "Username should be 8 chars minimum."),
      }),
      username: yup
        .string()
        .required("First Name is Required.")
        .trim()
        .matches(/^\S*$/, "Username can not have space")
        .min(8, "Username should be 8 chars minimum.")
        .max(20, "Username should be 20 chars maximum."),
      password: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          "Password must contain at least one uppercase letter, lowercase letter and number."
        ),
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is Required."),
      age: yup.number().required("Age is required.").positive().integer(),
      gander: yup.mixed().oneOf(["male", "female"], "Gender is required."),
    });
    return schema.validate(value);
  };
  const handleChange = (key) => (e) => {
    if (["first", "last"].includes(key))
      setRegister({
        ...register,
        name: { ...register.name, [key]: e.target.value },
      });
    else setRegister({ ...register, [key]: e.target.value });
  };
  const submit = (action) => {
    if (action === "cancel") return history.push("/");
    validate(register)
      // .then((value) => {
      //   return fetch("http://127.0.0.1:3000/user/register", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(value),
      //   });
      // })
      // .then((data) => console.log(data))
      .catch((err) => {
        console.log(err.errors[0]);
      });
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
            required={true}
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
