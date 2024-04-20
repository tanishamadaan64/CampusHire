import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function Description() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchCompany = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get/company/${id}`);
      setData(response.data[0]);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="fw-bold">{data ? data.name : "Loading..."}</h2>
            </div>
            <div className="card-body">
              <p><strong>Type:</strong> {data ? data.Type : "Loading..."}</p>
              <p><strong>Arrival Date:</strong> {data ? data.Arrival_date : "Loading..."}</p>
              <p><strong>Role Offered:</strong> {data ? data.role : "Loading..."}</p>
              <p><strong>Open for Majors:</strong> {data ? data.open_for : "Loading..."}</p>
              <p><strong>CTC to be offered:</strong> {data ? data.offered_ctc : "Loading..."}</p>
              <p><strong>Year:</strong> {data ? data.year : "Loading..."}</p>
              <p><strong>Gpa Required:</strong> {data ? data.gpa : "Loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
