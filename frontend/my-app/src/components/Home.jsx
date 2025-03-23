import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setEmployees, deleteEmployee } from '../redux/reducers/EmployeeReducer';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import TablePagination from '@mui/material/TablePagination';
import { Box, TextField, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from '@mui/material';
import Swal from 'sweetalert2';

function Home() {
    const [filterText, setFilterText] = useState("");
    const [page, setPage] = useState(0);   
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const navigate = useNavigate();

    const employees = useSelector((state) => state.users) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:5000/employees')
            .then(response => { 
                if (response.status !== 200) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                if (!Array.isArray(response.data)) { 
                    throw new Error("Invalid data format from server");
                }
                dispatch(setEmployees(response.data));
            })
            .catch(error => {
                console.error("Request failed:", error);
            });
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/delete/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Employee has been deleted.",
                            timer: 2000,
                            icon: "success"
                        }).then(() => {
                            location.reload();
                        });
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete employee.",
                            icon: "error"
                        });
                        console.error(err);
                    });
            }
        });
    };

    const handleLogout = () => {
            Swal.fire({
                title: "Are you sure you want to log out?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                Swal.fire({
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                timer: 2000,
                icon: "success"
            }).then(() => {
                navigate("/login");
            });
        }
    });
};
     

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
        setPage(0);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredEmployees = employees.filter(employee => 
        employee.name && employee.name.toLowerCase().includes(filterText.toLowerCase()) ||
        employee.email && employee.email.toLowerCase().includes(filterText.toLowerCase()) ||
        employee.position && employee.position.toLowerCase().includes(filterText.toLowerCase())
    );

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className='container'>
        <h2 className="text-center my-4">Employee CRUD</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
       
            <div className="d-flex gap-2">
                <Link to="/create" className="btn btn-success">Create</Link>
                <Box sx={{ maxWidth: 300 }}>
                    <TextField 
                        fullWidth
                        label="Search Employee"
                        variant="outlined"
                        size="small"
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </Box>
            </div>

            <button onClick={handleLogout} className="btn btn-warning">Logout</button>
        </div>


            <Table className='table table-bordered table-striped text-center'>
                <TableHead>
                    <TableRow>
                        {['ID', 'name', 'email', 'position'].map((key) => (
                            <TableCell key={key}>
                                <TableSortLabel 
                                    active={sortConfig.key === key}
                                    direction={sortConfig.key === key ? sortConfig.direction : 'asc'}
                                    onClick={() => handleSort(key)}
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedEmployees.length > 0 ? (
                        sortedEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((emp, index) => (
                            <TableRow key={index}>
                                <TableCell>{emp.id ?? "N/A"}</TableCell>
                                <TableCell>{emp.name ?? "N/A"}</TableCell>
                                <TableCell>{emp.email ?? "N/A"}</TableCell>
                                <TableCell>{emp.position ?? "N/A"}</TableCell>
                                <TableCell>
                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                        <Link to={`/read/${emp.id}`} className='btn btn-info btn-sm' title="View Details">
                                            <FaEye size={16} />
                                        </Link>
                                        <Link to={`/update/${emp.id}`} className='btn btn-primary btn-sm' title="Edit">
                                            <FaEdit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(emp.id)} className='btn btn-danger btn-sm' title="Delete">
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="5" className="text-center">No employees found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="d-flex justify-content-between align-items-center p-2">
                <span className="text-muted">
                    Showing {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, employees.length)} of {employees.length}
                </span>
                <TablePagination
                    component="div"
                    count={filteredEmployees.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </div>
        </div>
    );
}

export default Home;
