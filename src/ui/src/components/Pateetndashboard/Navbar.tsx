import React from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li className="var_nav">
          <div className="link_bg"></div>
          <div className="link_title">
            <div className="icon">
              <i className="icon-home icon-2x"></i>
            </div>
            <Link to="/gesundheitsdaten">
              <span>Gesundheitsdaten</span>
            </Link>
          </div>
        </li>
        <li className="var_nav">
          <div className="link_bg"></div>
          <div className="link_title">
            <div className="icon">
              <i className="icon-calendar icon-2x"></i>
            </div>
            <Link to="/terminbuchung">
              <span>Terminbuchung</span>
            </Link>
          </div>
        </li>
        <li className="var_nav">
          <div className="link_bg"></div>
          <div className="link_title">
            <div className="icon">
              <i className="icon-file icon-2x"></i>
            </div>
            <Link to="/rezeptanforderungen">
              <span>Rezeptanforderungen</span>
            </Link>
          </div>
        </li>
  
      </ul>
    </nav>
  );
};

export default Navbar;