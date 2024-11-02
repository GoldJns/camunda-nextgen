import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="icon-container">
      <h2><i className="fas fa-user-injured patient-icon"></i></h2>

        
        <h2>Patient Dashboard</h2>
      </div>
      <ul>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-home icon-2x"></i>
            </div>
            <Link to="/Patienten/gesundheitsdaten">
              <span>Gesundheitsdaten</span>
            </Link>
          </div>
        </li>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-calendar icon-2x"></i>
            </div>
            <Link to="/Patienten/terminbuchung">
              <span>Terminbuchung</span>
            </Link>
          </div>
        </li>
        <li className="var_nav">
          <div className="link_title">
            <div className="icon">
              <i className="icon-file icon-2x"></i>
            </div>
            <Link to="/Patienten/rezeptanforderungen">
              <span>Rezeptanforderungen</span>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
