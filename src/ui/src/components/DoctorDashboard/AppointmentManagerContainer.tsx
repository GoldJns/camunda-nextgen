import React, { useEffect, useState } from "react";
import "./css/Doctor.css";

interface Appointment {
  id: number;
  userId: string;
  patientname: string;
  docName: string;
  date: string;
  time: string;
}

const accessToken = sessionStorage.getItem("accessToken")!;
// const userId = sessionStorage.getItem("userId");
const username = sessionStorage.getItem("username")!;
const APPOINTMENT_URL = "http://localhost:8080/api/appoint";

const AppointmentManagerContainer: React.FC = () => {

  const [doctorAppointments, setDoctorAppointments] = useState<Appointment[]>([]);

  // ====================== Read Appointment By Username =======================
  const fetchAppointmentsByUsername = async (): Promise<Appointment[]> => {
    try {
        const response = await fetch(APPOINTMENT_URL+"/byusername/"+username, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return data || [];
        } else {
          console.error('Failed to fetch appointments by username:', response.status);
          return [];
        }
    } catch (error) {
        console.error('Error fetching appointments by username:', error);
        return [];
    }
  };

  const loadAppointments = async () => {
    const appointments = await fetchAppointmentsByUsername();
    appointments.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time);
      const dateB = new Date(b.date + 'T' + b.time);
      return dateA.getTime() - dateB.getTime();
    });
    setDoctorAppointments(appointments);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const appointments = [
      { patientName: "AMIRA YER", date: "2024-10-01", time: "10:00" },
      { patientName: "Jane D", date: "2024-10-02", time: "11:00" },
      { patientName: "SOSO J", date: "2024-10-03", time: "1:00" },
    ];

      // const [waitingList, setWaitingList] = React.useState([
      //   { patientName: "SS Brown", date: "2024-10-01", time: "10:00", status: "Pending" },
      //   { patientName: "Charlie Black", date: "2024-10-01", time: "10:00", status: "Pending" },
      //   { patientName: "Diana Green", date: "2024-10-01", time: "10:00", status: "Pending" },
      // ]);
    
      // Function to handle acceptance of a patient
      // const handleAccept = (index: number) => {
      //   const updatedList = waitingList.map((waiting, i) => {
      //     if (i === index) {
      //       return { ...waiting, status: "Accepted" };
      //     }
      //     return waiting;
      //   });
      //   setWaitingList(updatedList);
      // };
    
      // Function to handle rejection of a patient
      // const handleReject = (index: number) => {
      //   const updatedList = waitingList.map((waiting, i) => {
      //     if (i === index) {
      //       return { ...waiting, status: "Rejected" };
      //     }
      //     return waiting;
      //   });
      //   setWaitingList(updatedList);
      // };   
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
        {/* <div className="waitings">
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
        </div> */}
      </div>
    </div>
  );
};

export default AppointmentManagerContainer;
