import React from "react";
import DoctorNavbar from "./DoctorNavbar";
import "./css/Doctor.css";
import AppointmentManagerContainer from "./AppointmentManagerContainer";

const AppointmentManager: React.FC = () => {
  return (
    <section className="consection">
      <DoctorNavbar />
      <AppointmentManagerContainer />
    </section>
  );
};

export default AppointmentManager;
