import React from 'react';
import Navbar from './Navbar';
import "./css/styles.css";
import MedicalHistoryContainer from './MedicalHistoryContainer';



const MedicalHistoryPage: React.FC = () => {
  return (
    <section className='consection'>  
      <Navbar />
      <MedicalHistoryContainer />

</section>
      
  );
};

export default MedicalHistoryPage;