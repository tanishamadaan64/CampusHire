import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [batch, setBatch] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [backlogs, setBacklogs] = useState('');

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    //const formattedDate = new Date(date).toISOString().split('T')[0]; // Format the date
    axios.post('http://localhost:5000/api/create/student', {
      name,
      branch,
      year,
      batch,
      cgpa,
      backlogs
    })
    .then(res => {
      console.log(res);
      navigate('/students');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3" style={{ border: "2px" }}>
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Branch</label>
            <input
              type="text"
              placeholder="Enter Branch"
              className="form-control"
              name="branch"
              onChange={e => setBranch(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Year</label>
            <input
              type="text" // Use type="date" for date input
              placeholder="Enter year"
              className="form-control"
              name="year"
              onChange={e => setYear(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Batch</label>
            <input
              type="text"
              placeholder="Enter Batch"
              className="form-control"
              name="batch"
              onChange={e => setBatch(e.target.value)}
            />
          </div>
          
          <div className="mb-2">
            <label htmlFor="">CGPA</label>
            <input
              type="text"
              placeholder="Enter cgpa"
              className="form-control"
              name="cgpa"
              onChange={e => setCgpa(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Backlogs</label>
            <input
              type="text"
              placeholder="Enter backlogs"
              className="form-control"
              name="backlogs"
              onChange={e => setBacklogs(e.target.value)}
            />
          </div>
         
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
