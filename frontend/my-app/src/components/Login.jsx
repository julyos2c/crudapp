import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Grid, Typography, Alert } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // const handleLogin = () => {
    //     const hardcodedUser = { username: "admin", password: "password" };

    //     if (username === hardcodedUser.username && password === hardcodedUser.password) {
    //         localStorage.setItem("token", "fake-jwt-token");
    //         navigate('/home');
    //     } else {
    //         setError("Invalid Credentials");
    //     }
    // };
    const handleLogin = async () => {
        try{
            const response = await axios.post("http://localhost:5000/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back!",
                timer: 1000,
                showConfirmButton: false,
            
        }).then(() => {
            navigate("/home");
    });

    } catch (error) {
            setError("Invalid Credentials");
    
            // Show error alert
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid username or password",
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: 24, textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>Login</Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        onClick={handleLogin} 
                        style={{ marginTop: 16 }}
                    >
                        Login
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
