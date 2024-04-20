import { useState, useEffect } from "react";
import axios from "axios";
import { isStudent, isAuthenticated } from "./../auth/isAuthorized";
import { Link } from "react-router-dom";

function Student() {
  const [data, setData] = useState([]);
  const user = isAuthenticated();

  const loadStudents = async () => {
    const students = await axios.get(
      "http://localhost:5000/api/get/students"
    );
    setData(students.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <div className="table-responsive">
        {!isStudent() && (
          <Link to="/create/student" className="btn btn-success">
            Add
          </Link>
        )}

        <table className="table table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Batch</th>
              <th>CGPA</th>
              <th>Backlogs</th>

              {!isStudent() && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((student, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                    {student.name}
                    </td>
                    <td>{student.branch}</td>
                    <td>{student.year}</td>
                    <td>{student.batch}</td>
                    <td>{student.cgpa}</td>
                    <td>{student.backlogs}</td>

                    {!isStudent() && (
                      <td>
                        <Link
                          to={`update/${student.id}`}
                          className="btn btn-primary ml-2"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleDelete(student.id)}
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

export default Student;
