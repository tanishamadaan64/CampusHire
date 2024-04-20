import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateCompany() {
  const [name, setName] = useState('');
  const [gpa, setGpa] = useState('');
  const [role, setRole] = useState('');
  const [openfor, setOpenfor] = useState('');

  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [ctc, setCtc] = useState('');
  const [year, setYear] = useState('');

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Format the date
    axios.post('http://localhost:5000/api/create/company', {
      name,
      gpa,
      role,
      openfor,
      type,
      date: formattedDate, // Use the formatted date
      ctc,
      year
    })
    .then(res => {
      console.log(res);
      navigate('/');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3" style={{ border: "2px" }}>
        <form onSubmit={handleSubmit}>
          <h2>Add Company</h2>
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
            <label htmlFor="">Type</label>
            <input
              type="text"
              placeholder="Enter Type"
              className="form-control"
              name="type"
              onChange={e => setType(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Date of Arrival</label>
            <input
              type="date" // Use type="date" for date input
              className="form-control"
              name="date"
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">CTC</label>
            <input
              type="text"
              placeholder="Enter CTC"
              className="form-control"
              name="ctc"
              onChange={e => setCtc(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Year</label>
            <input
              type="text"
              placeholder="Enter Year"
              className="form-control"
              name="year"
              onChange={e => setYear(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Gpa required</label>
            <input
              placeholder="Enter gpa required"
              className="form-control"
              name="gpa"
              onChange={e => setGpa(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Open For</label>
            <input
              placeholder="Enter open for"
              className="form-control"
              name="openfor"
              onChange={e => setOpenfor(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Role</label>
            <input
              placeholder="Enter Role Offered"
              className="form-control"
              name="role"
              onChange={e => setRole(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateCompany;
