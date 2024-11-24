import React, { useEffect, useState } from "react";
import { GetHealthRecords, DOcHeathRecord } from "../API"; // Adjust the path as necessary
import "./css/Doctor.css";

const DocHealthRecords: React.FC = () => {
  const [healthRecords, setHealthRecord] = useState<DOcHeathRecord[]>([]);
  const accessToken = sessionStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const tasksPerPage = 1;

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await GetHealthRecords(accessToken);
      setHealthRecord(tasks || []);

      setTotalTasks((tasks || []).length);
      setIsLoading(false);
    };

    fetchTasks();
  }, [accessToken]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalTasks / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate the index of the current health record
  const currentRecordIndex = currentPage - 1;
  const currentRecord = healthRecords[currentRecordIndex];

  return (
    <div className="Gesdivs">
      <div className="Titles">
        <h1>Health Records</h1>
      </div>
      <div className="heathtable">
        {currentRecord ? (
          <div className="patien-card">
            <h2>Patient Name: {currentRecord.username}</h2>
            <h4>{currentRecord.healthInsurance}</h4>
            <hr />
            <div className="details">
              <h6>Allergien</h6>
              <div className="d">
                <ul>
                  {currentRecord.allergies.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <hr />

              <h6>Krankheiten</h6>
              <div className="d">
                <ul>
                  {currentRecord.medicalHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <hr />

              <h6>Laborergebnisse und Diagnosen</h6>
              <div className="d">
                <ul>
                  {currentRecord.diagnoses.map((degitem, index) => (
                    <li key={index}>{degitem}</li>
                  ))}
                </ul>
              </div>

              <hr />

              <h6>Medikamentenliste</h6>
              <div className="d">
                <ul>
                  {currentRecord.medicines.map((meditem, index) => (
                    <li key={index}>{meditem}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-tasks">
             {isLoading ? (  
                          <h2>Loading...</h2>

               ) :(
            <h2>Steht keine Krankenakten zur verfügung</h2>
            )}
          </div>
        )}
        <div className="task-selection">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <i className="fas fa-chevron-left"> </i>

          </button>
          <span>
            {currentPage} of  {Math.ceil(totalTasks / tasksPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(totalTasks / tasksPerPage)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocHealthRecords;
