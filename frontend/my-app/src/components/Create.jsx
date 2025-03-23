import React, { useState } from 'react';
import { addEmployee } from '../redux/reducers/EmployeeReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Paper, Grid, Typography, Snackbar, Alert } from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';
import Swal from "sweetalert2";

function Create() {
    const [values, setValues] = useState({ name: "", email: "", position: "" });
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/employees', values);
            // console.log("Employee added successfully:", response.data);

            // Dispatch to Redux Store
            dispatch(addEmployee(response.data));

            Swal.fire({
                icon: "success",
                title: "Employee Added!",
                text: "The new employee has been successfully added.",
                timer: 1000,
                showConfirmButton: false,
            });

            navigate('/home');
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to add the employee. Please try again.",
            });
        }
    };

     // Function to handle Enter key press
     const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: 24, textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>Add New Employee</Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Position"
                            variant="outlined"
                            margin="normal"
                            value={values.position}
                            onChange={(e) => setValues({ ...values, position: e.target.value })}
                            required

                            onKeyDown={handleKeyDown} // Listen for Enter key
                        />

                        <Grid container spacing={2} style={{ marginTop: 16 }}>
                            <Grid item xs={6}>
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color="secondary" 
                                    startIcon={<ArrowBack />}
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button 
                                    fullWidth 
                                    type="submit"
                                    variant="contained" 
                                    color="primary" 
                                    startIcon={<Send />}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>

            {/* Snackbar for error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
                    {error}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default Create;
