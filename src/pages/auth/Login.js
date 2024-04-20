import React from "react";
import { useState } from "react";
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
// import './login.css'; // Import your CSS file

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  // const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/login", { username, password })
      .then((res) => {
        if (res.data.status == 200) {
          cookies.set("user", res.data.user, {
            path: "/",
          });
          // navigate('/')
          window.location.href = "/";
        } else {
          // navigate('create');
          window.location.href = "/create";
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // You can handle form submission here
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="bg-dark d-flex flex-column justify-content-center p-4 rounded">
        <div className="loginheader">
          <h1 className="text-light">PLACEMENT PORTAL</h1>
        </div>
        <div className="loginbody">
          <form onSubmit={handleSubmit}>
            <div className="logininputcontainer">
              <label htmlFor="username" className="text-light">User ID</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter User ID"
              />
            </div>
            <div className="logininputcontainer">
              <label htmlFor="password" className="text-light">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="loginbuttoncontainer">
              <input type="submit" value="LOGIN" className="btn btn-primary mt-2" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
