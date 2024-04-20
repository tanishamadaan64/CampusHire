// import logo from './logo.svg';
import "./App.css";
import Company from "./pages/Company";
import CreateCompany from "./CreateCompany";
import UpdateCompany from "./UpdateCompany";
import Description from "./Description";
import UpdateStudent from "./UpdateStudent";
import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
// import Login from "./pages/auth/Login";
import { isStudent } from "./auth/isAuthorized";
import Student from "./pages/Student";
import CreateStudent from "./pages/CreateStudent";
import { Bar } from "react-chartjs-2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/" element={<Company />}></Route>
        {/* <Route path="/update/:id" element={<UpdateCompany />} /> */}
        <Route
          path="/create"
          element={
            <ProtectedRoute allow={() => !isStudent()}>
              <CreateCompany />
            </ProtectedRoute>
          }
        />
         <Route
          path="/create/student"
          element={
            <ProtectedRoute allow={() => !isStudent()}>
              <CreateStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute allow={() => !isStudent()}>
              <Student />
            </ProtectedRoute>
          }
        />
         <Route
          path="/home"
          element={
              <Home />
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute allow={() => !isStudent()}>
              <UpdateCompany />
            </ProtectedRoute>
          }
        />
         <Route
          path="/students/update/:id"
          element={
            <ProtectedRoute allow={() => !isStudent()}>
              <UpdateStudent />
            </ProtectedRoute>
          }
        />
        <Route path="/company/:id" element={<Description />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
