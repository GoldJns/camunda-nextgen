import React  , { useEffect, useState } from "react";
import "./css/Doctor.css";
import { GetHealthRecords ,GetAllAppioment } from "../API"; // Adjust the path as necessary

const DashboardContainer: React.FC = () => {
  const [users, setUsers] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<number | null>(null);
    const accessToken = sessionStorage.getItem("accessToken");
    const username = sessionStorage.getItem("username")!;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await GetHealthRecords(accessToken);
        setUsers(tasks?.length || 0); 
     
        const appointmentCount = await GetAllAppioment(accessToken ,username);
         setAppointments(appointmentCount?.length || 0);
      } catch (error) {
        console.error("Error fetching health records:", error);
      }
    };

    fetchTasks();
  }, [accessToken]);
  return (
    <div className="docdiv">
      <div className="Titles">
        <h1>Gesundheitsdaten</h1>
      </div>
      <div className="staticss">
        <div className="item">
          <h1>Gesamtzahl der Patienten</h1>
          <h2>
            <i className="fas fa-user-injured patient-icon fa-2x userpic"></i>
          </h2>
          <h4>{users !== null ? users : "Loading..."}</h4>
        </div>
      
        <div className="item">
          <h1>Gesamtzahl der Termine</h1>
          <h2>
            <i className="fas fa-calendar icon fa-2x terminpic"></i>
          </h2>
          <h4>{appointments !== null ? appointments : "Loading..."}</h4>

        </div>
   
      </div>
    </div>
  );
};

export default DashboardContainer;
