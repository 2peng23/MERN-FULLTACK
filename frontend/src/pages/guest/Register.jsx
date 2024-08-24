import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const setValue = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5555/api/user/create", data)
      .then((res) => {
        console.log(res.data.success);
        if(res.data.success === 1){
          setData({
            name: "",
            password: "",
            email: "",
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            autoComplete="name"
            autoFocus
            value={data.name}
            onChange={(e) => setValue(e, "name")}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
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
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
