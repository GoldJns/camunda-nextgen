import React  from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {


const name = sessionStorage.getItem("name")
  return (
    <nav className="navbar">
      <div className="icon-container">
      <h2>Willkommen {name}</h2>

      <h2><i className="fas fa-user-injured patient-icon"></i></h2>

        
        <h2>Patient Dashboard</h2>

      </div>
      <ul>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-home icon-2x"></i>
            </div>
            <Link to="/Patienten/MedicalHistory">
              <span>Gesundheitsdaten</span>
            </Link>
          </div>
        </li>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-calendar icon-2x"></i>
            </div>
            <Link to="/Patienten/Appointment">
              <span>Terminbuchung</span>
            </Link>
          </div>
        </li>
   
   
      </ul>
    </nav>
  );
};

export default Navbar;
