import React from 'react';
import Navbar from './DoctorNavbar';
import "./css/Doctor.css";

import HealthRecords from './DHealthRecordContainer';



const DocHealthPage: React.FC = () => {
  return (
    <section className='consection'>  
      <Navbar />
      <HealthRecords />

</section>
      
  );
};

export default DocHealthPage;