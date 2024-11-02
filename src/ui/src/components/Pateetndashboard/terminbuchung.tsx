import React from 'react';
import Navbar from './Navbar';
import "./pdashboard.css";
import Schedule from './Schedule';



const Terminbuchung: React.FC = () => {
  return (
    <section className='consection'>  
      <Navbar />
      <Schedule />


</section>
      
  );
};

export default Terminbuchung;