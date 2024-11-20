import React from "react";
import "./css/DoctorNavbar.css";
import { Link } from "react-router-dom";

const DoctorNavbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="icon-container">
        <h2>
          <i className="fas fa-user-md icon fa-2x"></i>
        </h2>

        <h2>Doctor Dashboard</h2>
      </div>
      <ul>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-home icon-2x"></i>
            </div>
            <Link to="/Doctor/Dashboard">
              <span>Gesundheitsdaten</span>
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

      </ul>
    </nav>
  );
};

export default DoctorNavbar;
