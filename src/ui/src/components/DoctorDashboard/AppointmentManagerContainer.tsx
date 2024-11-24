import React, { useEffect, useState } from "react";
import "./css/Doctor.css";

interface Appointment {
  id: number;
  userId: string;
  patientName: string;
  docName: string;
  date: string;
  time: string;
}



const AppointmentManagerContainer: React.FC = () => {
  const accessToken = sessionStorage.getItem("accessToken")!;
  const username = sessionStorage.getItem("username")!;
  const APPOINTMENT_URL = "http://localhost:8080/api/appoint";
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

  // ====================== Helper Methods =======================
  const formatDateToGerman = (date: Date) => {
    return date.toLocaleDateString("de-DE");
  };

  useEffect(() => {
    loadAppointments();
  }, []);

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
              {doctorAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.patientName}</td>
                  <td>{formatDateToGerman(new Date(appointment.date))}</td>
                  <td>{appointment.time.slice(0,5)}</td>
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
