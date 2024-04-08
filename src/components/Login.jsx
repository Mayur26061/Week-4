import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Card, Typography } from "@mui/material";
import { BASE_URL } from "../config";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    const response = await axios.post(
      `${BASE_URL}/admin/login`,
      {},
      {
        headers: {
          username: email,
          password,
        },
      }
    );
    if (response.data.error) {
      console.log(response.data.error);
    } else {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location = "/courses";
      }
    }
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
      <Typography variant="h6">Signin</Typography>
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
            Signin
          </Button>
        </form>
        <div style={{ marginTop: "10px" }}>
          New user?{" "}
          <Button onClick={() => navigate("/signup")} size="small">
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;
