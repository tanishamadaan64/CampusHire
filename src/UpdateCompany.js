import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCompany() {
  const [name, setName] = useState('');
  const [gpa, setGpa] = useState('');
  const [openfor, setOpenfor] = useState('');
  const [role, setRole] = useState('');

  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [ctc, setCtc] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/company/${id}`)
      .then(res => {
        const company = res.data[0];
        setName(company.name);
        setGpa(company.gpa);
        setOpenfor(company.open_for); // Corrected state setter
        setRole(company.role); // Corrected state setter

        setType(company.type);
        setDate(company.Arrival_Date);
        setCtc(company.offered_ctc);
        setYear(company.Year);
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    const formattedDate = new Date(date).toISOString().split('T')[0];
    axios.put(`http://localhost:5000/update/${id}`, {
      name,
      gpa,
      openfor, // Corrected property name
      role, // Corrected property name
      type,
      date: formattedDate,
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
          <h2>Update Company</h2>
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
            <label htmlFor="">GPA</label>
            <input
              type="text"
              placeholder="Enter GPA"
              className="form-control"
              name="gpa"
              value={gpa}
              onChange={e => setGpa(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Open For</label>
            <input
              type="text"
              placeholder="Enter Open For"
              className="form-control"
              name="openfor"
              value={openfor}
              onChange={e => setOpenfor(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Role</label>
            <input
              type="text"
              placeholder="Enter Role"
              className="form-control"
              name="role"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </div>
          {/* Additional form inputs */}
          <div className="mb-2">
            <label htmlFor="">Type</label>
            <input
              type="text"
              placeholder="Enter Type"
              className="form-control"
              name="type"
              value={type}
              onChange={e => setType(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Date of Arrival</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={date}
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
              value={ctc}
              onChange={e => setCtc(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Year</label>
            <input
              type="number"
              placeholder="Enter Year"
              className="form-control"
              name="year"
              value={year}
              onChange={e => setYear(e.target.value)}
            />
          </div>
          {/* Form submit button */}
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCompany;
