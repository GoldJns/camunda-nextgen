import React from 'react';
import Navbar from './Navbar';
import "./css/Doctor.css";

import PatTasks from './PTasksContainer';



const DocTaskPage: React.FC = () => {
  return (
    <section className='consection'>  
      <Navbar />
      <PatTasks />

</section>
      
  );
};

export default DocTaskPage;