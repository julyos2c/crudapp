import React, { useState } from 'react';
import { addEmployee } from '../redux/reducers/EmployeeReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

function Create() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        position: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/employees', values);
            console.log("Employee added successfully:", response.data);
    
            // Dispatch to Redux Store
            dispatch(addEmployee(response.data));
    
            navigate('/');
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 border bg-secondary text-white p-4 p-md-5 rounded">
                <h3 className="text-center mb-4">Add New Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="John Doe" 
                            onChange={e => setValues({...values, name: e.target.value})} 
                            className="form-control" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email@example.com" 
                            onChange={e => setValues({...values, email: e.target.value})} 
                            className="form-control" 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">Position</label>
                        <input 
                            type="text" 
                            name="position" 
                            placeholder="CEO" 
                            onChange={e => setValues({...values, position: e.target.value})} 
                            className="form-control" 
                            required 
                        />
                    </div>

                    <div className="d-flex w-100 justify-content-between gap-2">
                        <button 
                            type="button" 
                            className="btn btn-dark d-flex align-items-center justify-content-center px-3"
                            onClick={() => navigate(-1)}
                        >
                            <FaArrowLeft className="me-2" /> Back
                        </button>

                        <button className="btn btn-info d-flex align-items-center justify-content-center px-3">
                            <FaPaperPlane className="me-2" /> Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
