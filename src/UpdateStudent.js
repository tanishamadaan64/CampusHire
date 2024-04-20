import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [batch, setBatch] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [backlogs, setBacklogs] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/student/${id}`)
      .then(res => {
        const company = res.data[0];
        setName(company.name);
        setBranch(company.branch);
        setYear(company.year);
        setBatch(company.batch);
        setCgpa(company.cgpa);
        setBacklogs(company.backlogs);
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
   // const formattedDate = new Date(date).toISOString().split('T')[0];
    axios.put(`http://localhost:5000/students/update/${id}`, { // Corrected the endpoint
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
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              value={name}
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
              value={branch}
              onChange={e => setBranch(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Year</label>
            <input
              type="year"
              placeholder="Enter year"
              className="form-control"
              name="year"
              value={year}
              onChange={e => setYear(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Batch</label>
            <input
              type="int"
              placeholder="Enter Batch"
              className="form-control"
              name="batch"
              value={batch}
              onChange={e => setBatch(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">CGPA</label>
            <input
              type="decimal"
              placeholder="Enter cgpa"
              className="form-control"
              name="cgpa"
              value={cgpa}
              onChange={e => setCgpa(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Backlogs</label>
            <input
              type="int"
              placeholder="Enter Backlogs"
              className="form-control"
              name="backlogs"
              value={backlogs}
              onChange={e => setBacklogs(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">Submit</button> {/* Corrected button type */}
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
