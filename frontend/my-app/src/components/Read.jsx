import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

  function Read () {
    const {id} = useParams();
    const [employee, setEmployee] = useState([]);

        useEffect(() => {
            axios.get(`http://localhost:5000/read/${id}`)
            .then(res => {
                // console.log(res.data)
                setEmployee(res.data[0]);
        })
            .catch(err => console.log(err))

        }, [id]);
        return (
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <h2>Employee Detail</h2>
                    <h2>ID: {employee.id}</h2>
                    <h2>Name: {employee.name}</h2>
                    <h2>Email: {employee.email}</h2>
                    <h2>Position: {employee.position}</h2>

                    <Link to="/" className='btn btn-primary me-2'>Back</Link>
                    <Link to={`/update/${employee.id}`} className='btn btn-primary'>Edit</Link>
                </div>
            </div>
        )
  }

  export default Read;
  