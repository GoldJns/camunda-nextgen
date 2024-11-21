import React from "react";
import "./css/Doctor.css";

const DashboardContainer: React.FC = () => {
  return (
    <div className="docdiv">
      <div className="Titles">
        <h1>Gesundheitsdaten</h1>
      </div>
      <div className="statics">
        <div className="item">
          <h1>Gesamtzahl der Patienten</h1>
          <h2>
            <i className="fas fa-user-injured patient-icon fa-2x userpic"></i>
          </h2>
          <h1> 55</h1>
        </div>
        <div className="item">
          <h1> Gesamtzahl der Medikamente</h1>
          <h2>
            <i className="fas fa-pills icon fa-2x medicpic"></i>
          </h2>
          <h1> 22</h1>
        </div>
        <div className="item">
          <h1>Gesamtzahl der Termine</h1>
          <h2>
            <i className="fas fa-calendar icon fa-2x terminpic"></i>
          </h2>
          <h1> 10</h1>
        </div>
        <div className="item">
          <h1>Gesamtzahl der Rezepte</h1>
          <h2>
            <i className="fas fa-medkit fa-2x rezpic"></i>
          </h2>
          <h1> 20</h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
