import React, { use, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { updateEmployee } from '../redux/reducers/EmployeeReducer';
import axios from 'axios';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';




function Update() {
    // const {id} = useParams();
    // const employees = useSelector((state) => state.employees);
    // const existingEmployee = employees.find(emp => emp.id === parseInt(id));

    // if (!exisitngEmployee) {
    //     return <h3 className="text-center">Employee not found</h3>
    // }
    // const {name, email, position} = existingEmployee;
    // const [uname, setName] = useState(name);
    // const [uemail, setEmail] = useState(email);
    // const [uposition, setPosition] = useState(position);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const handleUpdate = (event) => {
    //     event.preventDefault();
    //     dispatch(updateEmployee({
    //         id: parseInt(id),
    //         name: uname,
    //         email: uemail,
    //         position: uposition
    //     }));
    //     navigate('/');
    // };
    
    const {id} = useParams();
    const navigate = useNavigate();

        useEffect(() => {
            axios.get(`http://localhost:5000/read/${id}`)
            .then(res => {
                console.log(res)
                setValues({...values, name: res.data[0].name, email: res.data[0].email, position: res.data[0].position});
            })
            .catch(err => console.Console(err))
        }, [])
    const [values, setValues] = useState({
        name: '',
        email: '',
        position: ''
    })
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/update/${id}`, values)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err));
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="col-11 col-md-6 border bg-secondary text-white p-4 rounded">
                <h3 className="text-center">Update Employee</h3>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="John Doe"
                            className="form-control" 
                            value={values.name}
                            onChange={e => setValues({ ...values, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email@example.com"
                            className="form-control" 
                            value={values.email}
                            onChange={e => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position">Position</label>
                        <input 
                            type="text" 
                            name="position" 
                            placeholder="CEO"
                            className="form-control" 
                            value={values.position}
                            onChange={e => setValues({ ...values, position: e.target.value })}
                        />
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                        <button 
                            type="button" 
                            className="btn btn-dark d-flex align-items-center justify-content-center px-3"
                            onClick={() => navigate(-1)}
                        >
                            <FaArrowLeft className="me-2" /> Back
                        </button>
                        <button className="btn btn-info">
                            <FaEdit size={20} className="me-2" /> Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;