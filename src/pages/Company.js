import React, { useState, useEffect } from "react";
import axios from "axios";
import { isStudent, isAuthenticated } from "./../auth/isAuthorized";
import { Link } from "react-router-dom";

function Company() {
  const [data, setData] = useState([]);
  const user = isAuthenticated();

  const loadCompanies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get/companies"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/remove/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div className="table-responsive">
        {!isStudent() && (
          <Link to="/create" className="btn btn-success">
            Add
          </Link>
        )}

        <table className="table table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Type</th>
              <th>Date of Arrival</th>
              <th>CTC</th>
              <th>Year</th>
              {!isStudent() && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((company, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`company/${company.id}`}>{company.name}</Link>{" "}
                    </td>
                    <td>{company.Type}</td>
                    <td>{company.Arrival_date}</td> {/* Use company.Arrival_date */}
                    <td>{company.offered_ctc}</td>
                    <td>{company.year}</td>
                    {!isStudent() && (
                      <td>
                        <Link
                          to={`update/${company.id}`}
                          className="btn btn-primary ml-2"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleDelete(company.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Company;
