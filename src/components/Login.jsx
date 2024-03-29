import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Card, Typography } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const []
  //
  const navigate = useNavigate();
  const handleLogin = () => {
    axios
      .post(
        "http://localhost:3000/admin/login",
        {},
        {
          headers: {
            username: email,
            password,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            window.location = "/courses";
          }
        }
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">Login</Typography>
      <br />
      <Card style={{ width: "275px", padding: "20px" }} variant="outlined">
        <form>
          <TextField
            fullWidth={true}
            style={{ marginBottom: "10px" }}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            type="password"
            fullWidth={true}
            style={{ marginBottom: "10px" }}
            label="Password"
            variant="outlined"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            size="small"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
        <div style={{ marginTop: "10px" }}>
          New user?{" "}
          <Button onClick={() => navigate("/register")} size="small">
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;
