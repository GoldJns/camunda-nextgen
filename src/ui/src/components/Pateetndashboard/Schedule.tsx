import React, { useEffect, useState } from "react";
import "./Schedule.css"; // Import the CSS file for styling
interface Appoiment {
    datum: string;
    time: string;
  }
const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentAppointments, setCurrentAppointments] = useState<Appoiment[]>([]); // Changed to an array

/// to get appoiment from backend
  const [appointments, setAppointments] = useState<Appoiment[]>([
    { datum: "2024-09-08", time: "9:00" },
    { datum: "2024-09-09", time: "10:00" },
    { datum: "2024-10-09", time: "12:00" },
  ]);
  const daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  // Function to get the month name
  const getMonthName = (month: number): string => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ];
    return monthNames[month];
  };

  const [selectedTime, setSelectedTime] = useState<string | null>(null); // State for the selected time slot
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State for the selected time slot
  const [highlightedTime, setHighlightedTime] = useState<string | null>(null); // New state for highlighted time

  // Function to format date
  const formatDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Generate schedule for the current date
  const generateSchedule = () => {
    const formattedCurrentDate = formatDate(currentDate); 

    const scheduleElements: JSX.Element[]  = [];
    for (let hour = 8; hour <= 16; hour++) {
      const appointmentTime = `${hour}:00`;
      const formattedDate = formatDate(currentDate);
      const hasAppointment = appointments.some(
        (appointment) =>
          appointment.time === appointmentTime &&
          appointment.datum === formattedDate
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
          {appointmentTime}
        </div>
      );
    }
    return scheduleElements;
  };
  const handlesetAppointment = () => {
    if (selectedDate && selectedTime) {
      const newAppointment: Appoiment = {
        datum: selectedDate,
        time: selectedTime,
      };
      setCurrentAppointments((prev) => [...prev, newAppointment]); // Add new appointment to the array
      appointments.push(newAppointment);
      setHighlightedTime(null);
    } else {
      alert("Please select a date and time for the appointment.");
    }
  };
  // Update the date display when currentDate changes
  useEffect(() => {
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
  }, [currentDate]);

  return (
    <div className="Gesdiv">
    <div className="Titles">
      <h1>Terminbuchung</h1>
    </div>
  
    <div className="shcontainer">
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
        <button onClick={handlesetAppointment}>Termin Buchen</button>
      </div>

      {currentAppointments.length > 0 ? (
      <div className="termin">
        <h1> <i className="fas fa-calendar-alt"></i> Nächster Termin </h1>
        <div  className="termindata datum">
          <label>  Datum  </label>
          <label> Zeit </label>
        </div>
        {currentAppointments.map((appointment, index) => (
      <div key={index} className="termindata">
      <label> Datum: {appointment.datum} </label>
      <label> Zeit: {appointment.time} </label>
    </div>
  ))}
      </div>
 ) : (
    <div className="termin">
    <h1>  Kein Termin reserviert</h1>
    </div>
  )}
    </div>
    </div>
  );
};

export default Schedule;
