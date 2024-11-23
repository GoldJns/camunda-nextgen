import React, { useEffect, useState } from "react";
import "./css/Appointment.css"; 
import delIcon from '../../assets/del_icon.jpg';
import { apiCall } from "../TokenUtil";

interface appointmentTask {
  id: string;
  processDefinitionKey: string;
  creationDate: string;
  formKey: string;
  isFirst: boolean;
}

interface Appointment {
  id: number;
  patientName: string;
  docName: string;
  date: string;
  time: string;
}

interface Doctor {
  username: string;
  firstname: string;
  lastname: string;
}

const accessToken = sessionStorage.getItem("accessToken")!;
const userId = sessionStorage.getItem("userId");
const username = sessionStorage.getItem("username")!;
const APPOINTMENT_URL = "http://localhost:8080/api/appoint";

const AppointmentContainer: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentAppointments, setCurrentAppointments] = useState<Appointment[]>([]);
  const [savedAppointments, setSavedAppointments] = useState<Appointment[]>([]);
  const [doctorAppointments, setDoctorAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const fetchDoctorsAndAppointmentsFromBackend = async (reload: boolean) => {
    setLoading(true);
    const fetchedAppointmentsByUserId = await fetchAppointmentsByUserId();
    fetchedAppointmentsByUserId.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time);
      const dateB = new Date(b.date + 'T' + b.time);
      return dateA.getTime() - dateB.getTime();
    });
    setSavedAppointments(fetchedAppointmentsByUserId);
    setCurrentAppointments(fetchedAppointmentsByUserId);

    const fetchedDoctors = await fetchDoctors();
    const doctors = fetchedDoctors.map((doctor: Doctor) => doctor);
    setDoctors(doctors);

    if(selectedDoctor != null || reload){
      const fetchedAppointmentsByUsername = await fetchAppointmentsByUsername();
      fetchedAppointmentsByUsername.sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.time);
        const dateB = new Date(b.date + 'T' + b.time);
        return dateA.getTime() - dateB.getTime();
      });
      setDoctorAppointments(fetchedAppointmentsByUsername);
    }

    setLoading(false);
  };
  
  const daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const getMonthName = (month: number): string => {
    const monthNames = [
      "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
    ];
    return monthNames[month];
  };

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [highlightedTime, setHighlightedTime] = useState<string | null>(null);

  // Function to format date
  const formatDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateSchedule = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    const formattedCurrentDate = formatDate(currentDate); 
    const scheduleElements = [];

    for (let hour = 8; hour <= 16; hour++) {
      const formattedHour = String(hour).padStart(2, '0');
      const appointmentTime = `${formattedHour}:00:00`;

      const hasAppointment = doctorAppointments.some(
        (appointment) =>
          appointment.time === appointmentTime &&
          appointment.date === formattedCurrentDate
      );

      scheduleElements.push(
        <div key={hour} className={`time ${hasAppointment ? "past-time" : ""}  
          ${(highlightedTime === appointmentTime && selectedDate === formattedCurrentDate) ? "highlight" : ""} `}
          onClick={() => {
            if (!hasAppointment) {
              setSelectedTime(appointmentTime);
              setSelectedDate(formattedCurrentDate);
              setHighlightedTime(appointmentTime);
            }
          }}
          style={{ cursor: hasAppointment ? 'not-allowed' : 'pointer' }}
        >
          {appointmentTime.slice(0, 5)}
        </div>
      );
    }
    return scheduleElements;
  }

  // ====================== fetch Doctors =======================
  const fetchDoctors = async (): Promise<Doctor[]> => {
    try {
        const response = await apiCall("http://localhost:8080/api/user/role/Doctor", {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(" Doctors " + JSON.stringify(data));
          return data || [];
        } else {
          console.error('Failed to fetch Doctors:', response.status);
          return [];
        }
    } catch (error) {
        console.error('Error fetching Doctors:', error);
        return [];
    }
  };

// ====================== Read Appointment By UserID =======================
  const fetchAppointmentsByUserId = async (): Promise<Appointment[]> => {
    try {
        const response = await apiCall(APPOINTMENT_URL+"/byuserid/"+userId, {
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
          console.error('Failed to fetch appointments By UserID:', response.status);
          return [];
        }
    } catch (error) {
        console.error('Error fetching appointments By UserID:', error);
        return [];
    }
  };

  // ====================== Read Appointment By Username =======================
  const fetchAppointmentsByUsername = async (): Promise<Appointment[]> => {
    try {
        const response = await apiCall(APPOINTMENT_URL+"/byusername/"+selectedDoctor!.username, {
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

  // ====================== Create Appointment =======================
  const createAppointment = async (): Promise<void> => {
    try {
      const response = await apiCall(APPOINTMENT_URL+"/create/"+username,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        console.error("Appointment Process started successfully");
      } else {
        console.error("Error starting Appointment process");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTaskId = async (): Promise<string | null> => {
    try {
      const response = await apiCall(
        "http://localhost:8080/api/tasks?assignee=" +
          username +
          "&group",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched tasks:", data);
        const appointmentTask = data.items?.length > 0 ? data.items[0] : null;
        console.log("appointmentTask = " + JSON.stringify(appointmentTask));
        if (!appointmentTask.id) {
          console.error("No tasks found for this user or group.");
        }
        console.log("Appointment TaskID founded !! ");
        return appointmentTask.id;
      } else {
        console.error("Error getting Task Appointment");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const postCompleteTask = async (taskid: string): Promise<void> => {
    const userAppointment = {
      "patientName": username,
      "docName": selectedDoctor!.username, 
      "date": selectedDate, 
      "time": selectedTime,
    }
    try {
      const response = await apiCall(
        `http://localhost:8080/api/tasks/${taskid}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(userAppointment),
        }
      );

      if (response.ok) {
        console.log("Appointment saved !! ");
      } else {
        console.error("Error Completing Task Appointment");
       
      }
    } catch (error) {
      console.error("Error:", error);
    
    }
  };

  async function waitForTask() {
    console.log("waiting for 5 sec")
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  const handleAppointmentBooking = async (): Promise<void> => {
    if (selectedDate && selectedTime) {
      const newAppointment: Appointment = {
        id: 0, 
        patientName: username,
        docName: selectedDoctor!.username,
        date: selectedDate,
        time: selectedTime,
      };

      const updatedAppointments = [...savedAppointments, newAppointment];
      const sortedAppointments = updatedAppointments.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);

        return dateA.getTime() - dateB.getTime();
      });
      setCurrentAppointments(sortedAppointments);
      setSavedAppointments(sortedAppointments);
      setHighlightedTime(null);
    } else {
      alert("Please select a date and time for the appointment.");
    }
    // step 1
    await createAppointment();
    // Step 2
    await waitForTask();
    // Step 3
    const taskId = await getTaskId();
    // Step 4
    if (taskId) {
      await postCompleteTask(taskId);
    } else {
      console.error("Kein Task gefunden, der abgeschlossen werden kann.");
    }
    fetchDoctorsAndAppointmentsFromBackend(true);
  };
  
  // ====================== Update Appointment =======================
  const handleUpdate = async (appointmentId: string): Promise<void> => {
    const updateAppointment = {
      "id": appointmentId,
      "patientName": username,
      "docName": selectedDoctor, 
      "date": selectedDate, 
      "time": selectedTime,
    }
    try {
      const response = await apiCall(APPOINTMENT_URL+"/edit/"+username,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updateAppointment),
      });
      if (response.ok) {
        console.error("Appointment Deleted");
      } else {
        console.error("Error Deleting Appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    
    }
  }

  // ====================== Delete Appointment =======================
  const handleDelete = async (appointmentId: number): Promise<void> => {
    console.log(" ======================= " + appointmentId)
    try {
      const response = await apiCall(APPOINTMENT_URL+"/delete/"+appointmentId,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
      });
      if (response.ok) {
        console.error("Appointment Deleted");
        await fetchDoctorsAndAppointmentsFromBackend(true);
      } else {
        console.error("Error Deleting Appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    
    }
  };

  // ====================== Helper Methods =======================
  const handleDoctorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoctorName = event.target.value;
    const doctor = doctors.find((d) => d.username === selectedDoctorName) || null;
    setSelectedDoctor(doctor);
  };

  const formatDateToGerman = (date: Date) => {
    return date.toLocaleDateString("de-DE");
  };

  // Update the date display when currentDate changes
  useEffect(() => {
    fetchDoctorsAndAppointmentsFromBackend(false);

    // Update the date display whenever the currentDate or selectedDoctor changes
    const updateDateDisplay = () => {
      document.getElementById("yesterday-day")!.innerText =
        daysOfWeek[new Date(currentDate.getTime() - 86400000).getDay()];
      document.getElementById("yesterday-date")!.innerText = `${new Date(
        currentDate.getTime() - 86400000
      ).getDate()} ${getMonthName(
        new Date(currentDate.getTime() - 86400000).getMonth()
      )}`;
      document.getElementById("current-day")!.innerText =
        daysOfWeek[currentDate.getDay()];
      document.getElementById(
        "current-date"
      )!.innerText = `${currentDate.getDate()} ${getMonthName(
        currentDate.getMonth()
      )}`;
      document.getElementById("tomorrow-day")!.innerText =
        daysOfWeek[new Date(currentDate.getTime() + 86400000).getDay()];
      document.getElementById("tomorrow-date")!.innerText = `${new Date(
        currentDate.getTime() + 86400000
      ).getDate()} ${getMonthName(
        new Date(currentDate.getTime() + 86400000).getMonth()
      )}`;
    };

    updateDateDisplay();
    generateSchedule();
  }, [currentDate, selectedDoctor]);

  return (
    <div className="Gesdiv">
    <div className="Titles">
      <h1>Terminbuchung</h1>
    </div>

    <div className="shcontainer">
      <div className="Doctor">
        <h1>
          <span className="doctor-label">Arzt</span>
          <select className="doctor-dropdown" onChange={handleDoctorChange}>
          <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.username} value={doctor.username}>{doctor.username}</option>
            ))}
          </select>
        </h1>
      </div>

      <div className="header">
        <i
          className="fas fa-chevron-left"
          onClick={() =>
            setCurrentDate(new Date(currentDate.getTime() - 86400000))
          }
        ></i>
        <div id="yesterday">
          <span id="yesterday-day"></span>
          <span id="yesterday-date"></span>
        </div>
        <div id="currentday">
          <span id="current-day"></span>
          <span id="current-date"></span>
        </div>
        <div id="tomorrow">
          <span id="tomorrow-day"></span>
          <span id="tomorrow-date"></span>
        </div>
        <i
          className="fas fa-chevron-right"
          onClick={() =>
            setCurrentDate(new Date(currentDate.getTime() + 86400000))
          }
        ></i>
      </div>
      <div className="schedule">{generateSchedule()}</div>
      <div className="final">
        <button onClick={handleAppointmentBooking}>Termin Buchen</button>
      </div>

      {currentAppointments.length > 0 ? (
      <div className="termin">
        <h1> <i className="fas fa-calendar-alt"></i> Nächste Termine</h1>
        <div  className="termindata datum">
          <label>  Datum  </label>
          <label> Zeit </label>
          <label> Arzt </label>
          <label> Action </label>
        </div>
        {currentAppointments.map((appointment, index) => (
      <div key={index} className="termindata">
      <label> {formatDateToGerman(new Date(appointment.date))} </label>
      <label> {appointment.time.slice(0, 5)} </label>
      <label> Doc. {appointment.docName} </label>
      <label> 
        {/* <button 
          className="update-btn"
          onClick={() => handleUpdate(username)}>
          Update
        </button> */}
        <button 
          className="delete-btn"
          onClick={() => handleDelete(appointment.id)}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src={delIcon}
            alt="Delete" 
            className="delete-icon" 
            style={{ width: '20px', height: '20px' }}
          />
        </button> 
      </label>
    </div>
  ))}
      </div>
 ) : (
    <div className="termin">
      <h1>  keine Termine vorhanden</h1>
    </div>
  )}
    </div>
    </div>
  );
};

export default AppointmentContainer;
