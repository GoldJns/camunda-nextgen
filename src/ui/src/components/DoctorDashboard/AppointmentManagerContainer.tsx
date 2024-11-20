import React from "react";
import "./css/Doctor.css";

const AppointmentManagerContainer: React.FC = () => {
    const appointments = [
        { patientName: "AMIRA YER", date: "2024-10-01", time: "10:00" },
        { patientName: "Jane D", date: "2024-10-02", time: "11:00" },
        { patientName: "SOSO J", date: "2024-10-03", time: "1:00" },
      ];
      const [waitingList, setWaitingList] = React.useState([
        { patientName: "SS Brown", date: "2024-10-01", time: "10:00", status: "Pending" },
        { patientName: "Charlie Black", date: "2024-10-01", time: "10:00", status: "Pending" },
        { patientName: "Diana Green", date: "2024-10-01", time: "10:00", status: "Pending" },
      ]);
    
      // Function to handle acceptance of a patient
      const handleAccept = (index: number) => {
        const updatedList = waitingList.map((waiting, i) => {
          if (i === index) {
            return { ...waiting, status: "Accepted" };
          }
          return waiting;
        });
        setWaitingList(updatedList);
      };
    
      // Function to handle rejection of a patient
      const handleReject = (index: number) => {
        const updatedList = waitingList.map((waiting, i) => {
          if (i === index) {
            return { ...waiting, status: "Rejected" };
          }
          return waiting;
        });
        setWaitingList(updatedList);
      };   
  return (
    <div className="docdiv">
      <div className="Titles">
        <h1>TERMIN Daten</h1>
      </div>
      <div className="Dtermins">
        <div className="appoiments">
        <h2>Termine </h2>
          <table>
            <thead>
              <tr>
                <th>Patientenname</th>
                <th>Datum</th>
                <th>Zeit</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="waitings">
        <h2>Warteliste</h2>
          <table>
            <thead>
              <tr>
                <th>Patientenname</th>
                <th>Datum</th>
                <th>Zeit</th>
                <th>Status</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {waitingList.map((waiting, index) => (
                <tr key={index}>
                  <td>{waiting.patientName}</td>
                  <td>{waiting.date}</td>
                  <td>{waiting.time}</td>
                  <td>{waiting.status}</td>
                  <td>
                  <button onClick={() => handleAccept(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <i className="fas fa-check-circle" style={{ color: 'green', fontSize: '20px' }}></i>
                    </button>
                    <button onClick={() => handleReject(index)} style={{ background: 'none', border: 'none', marginLeft: '5px' , cursor: 'pointer' }}>
                      <i className="fas fa-times-circle" style={{ color: 'red', fontSize: '20px' }}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagerContainer;
