import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button, Container, Box } from "@mui/material";

function Read() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/read/${id}`)
            .then((res) => {
                setEmployee(res.data[0]);
            })
            .catch((err) => {
                console.error("Error fetching employee:", err);
                setError("Failed to load employee details.");
            });
    }, [id]);

    if (error) {
        return <Typography color="error" align="center" mt={5}>{error}</Typography>;
    }

    if (!employee) {
        return <Typography align="center" mt={5}>Loading employee details...</Typography>;
    }

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Card sx={{ minWidth: 300, p: 3, textAlign: "center" }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Employee Details
                        </Typography>
                        <Typography variant="body1"><strong>ID:</strong> {employee.id}</Typography>
                        <Typography variant="body1"><strong>Name:</strong> {employee.name}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
                        <Typography variant="body1"><strong>Position:</strong> {employee.position}</Typography>

                        <Box mt={3} display="flex" justifyContent="space-between">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component={Link} 
                                to="/home"
                            >
                                Back
                            </Button>

                            <Button 
                                variant="contained" 
                                color="secondary" 
                                component={Link} 
                                to={`/update/${employee.id}`}
                            >
                                Edit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default Read;
