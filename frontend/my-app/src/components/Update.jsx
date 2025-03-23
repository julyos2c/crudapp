import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Card, Typography, Box } from "@mui/material";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        position: "",
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/read/${id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    setValues({
                        name: res.data[0].name,
                        email: res.data[0].email,
                        position: res.data[0].position,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Employee not found!",
                    });
                    navigate("/home");
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Failed to fetch employee details.",
                });
                navigate("/home");
            });
    }, [id, navigate]);// Added dependency array

    const handleUpdate = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/update/${id}`, values)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Employee details updated successfully.",
                    timer: 2000,
                }).then(() => navigate("/home"));
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Update Failed!",
                    text: "Failed to update employee details.",
                });
            });
    };

    if (error) {
        return <Typography color="error" align="center" mt={5}>{error}</Typography>;
    }

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Card sx={{ p: 4, width: "100%", textAlign: "center" }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Update Employee
                    </Typography>

                    <form onSubmit={handleUpdate}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Name"
                                variant="outlined"
                                value={values.name}
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                            />
                        </Box>

                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={values.email}
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                            />
                        </Box>

                        <Box mb={3}>
                            <TextField
                                fullWidth
                                label="Position"
                                variant="outlined"
                                value={values.position}
                                onChange={(e) => setValues({ ...values, position: e.target.value })}
                            />
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate(-1)}
                                startIcon={<FaArrowLeft />}
                            >
                                Back
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<FaEdit />}
                            >
                                Update
                            </Button>
                        </Box>
                    </form>
                </Card>
            </Box>
        </Container>
    );
}

export default Update;
