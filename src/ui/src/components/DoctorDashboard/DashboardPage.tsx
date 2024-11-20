import React from "react";
import DoctorNavbar from "./DoctorNavbar";
import "./css/Doctor.css";
import DashboardContainer from "./DashboardContainer";

const DashboardPage: React.FC = () => {
  return (
    <section className="consection">
      <DoctorNavbar />
      <DashboardContainer />
    </section>
  );
};

export default DashboardPage;
