import React, { useContext, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  const setValue = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", data)
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
        toast.success(res.data.message);
        nav("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={(e) => setValue(e, "email")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => setValue(e, "password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
