import React from 'react';
import Navbar from './Navbar';
import "./pdashboard.css";
import Gesundheitsdaten from './Gesundheitsakteitems';



const Pdashboard: React.FC = () => {
  return (
    <section className='consection'>  
      <Navbar />
      <Gesundheitsdaten />

</section>
      
  );
};

export default Pdashboard;