import React from 'react';
import Navbar from './Navbar';
import "./css/styles.css";
import AppointmentContainer from './AppointmentContainer';



const AppointmentPage: React.FC = () => {
  return (
    <section className='consection'>  
      <Navbar />
      <AppointmentContainer />


</section>
      
  );
};

export default AppointmentPage;