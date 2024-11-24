import React from "react";
import "./css/DoctorNavbar.css";
import { Link, useNavigate } from "react-router-dom";

const DoctorNavbar: React.FC = () => {
  const navigate = useNavigate();

  const name = sessionStorage.getItem("name");

  const handleLogout = () => {
    sessionStorage.removeItem("name");

    sessionStorage.removeItem("username");
    sessionStorage.removeItem("accessToken");

    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="icon-container">
        <h2>Doctor Dashboard</h2>

        <h2>
          <i className="fas fa-user-md icon fa-2x"></i>
        </h2>
        <h2> {name}</h2>
      </div>
      <ul>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-home icon-2x"></i>
            </div>
            <Link to="/Doctor/Dashboard">
              <span>Home</span>
            </Link>
          </div>
        </li>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-calendar icon-2x"></i>
            </div>
            <Link to="/Doctor/AppointmentManager">
              <span>Terminbuchung</span>
            </Link>
          </div>
        </li>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-file icon-2x"></i>
            </div>
            <Link to="/Doctor/HealthRecords">
              <span>Health Record</span>
            </Link>
          </div>
        </li>

        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-tasks icon-2x"></i>
            </div>
            <Link to="/Doctor/Tasks">
              <span>Tasks</span>
            </Link>
          </div>
        </li>
        <li className="var_nav">
          <div
            className="link_title"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">
              <i className="fas fa-sign-out-alt fa-2x"></i>
            </div>
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default DoctorNavbar;
