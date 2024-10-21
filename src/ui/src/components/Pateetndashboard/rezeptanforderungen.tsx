import React from 'react';
import Navbar from './Navbar';
import "./pdashboard.css";
import Rezeptver from './Rezepform';



const Rezeptanforderungen: React.FC = () => {
  return (
    <section className='consection'>  
      <Navbar />
      <Rezeptver />

</section>
      
  );
};

export default Rezeptanforderungen;