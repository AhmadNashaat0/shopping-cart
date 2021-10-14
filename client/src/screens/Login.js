import { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import "../styles/login.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Field, PassField } from "../components/Fields";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (key) => (e) =>
    setLogin({ ...login, [key]: e.target.value });

  const submit = async (action) => {
    if (action === "cancel") return history.push("/");
    const url = "http://127.0.0.1:3000/user/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    };
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="login">
      <form>
        <h1>Login</h1>
        <Field
          name="email"
          value={login}
          onChange={handleChange("email")}
          label="email or username"
        />
        <PassField value={login} onChange={handleChange("password")} />
        <Stack spacing={2} direction="row" mt={2}>
          <Button
            size="large"
            variant="contained"
            fullWidth={true}
            onClick={submit}
          >
            sign in
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
          <p className="line">
            have no account ? then{" "}
            <Link color="red" to="/register">
              sign up
            </Link>
          </p>
        </Stack>
      </form>
    </div>
  );
};

export default Login;
