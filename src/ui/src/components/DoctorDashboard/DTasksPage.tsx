import React from 'react';
import Navbar from './DoctorNavbar';
import "./css/Doctor.css";

import DocTasks from './DTasksContainer';



const DocTaskPage: React.FC = () => {
  return (
    <section className='consection'>  
      <Navbar />
      <DocTasks />

</section>
      
  );
};

export default DocTaskPage;