import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MedicalHistoryPage from "./components/Pateetndashboard/MedicalHistoryPage";
import AppointmentPage from "./components/Pateetndashboard/AppointmentPage";

import "./App.css";
import DashboardPage from "./components/DoctorDashboard/DashboardPage";
import AppointmentManager from "./components/DoctorDashboard/AppointmentManager";
import PatTasks from "./components/Pateetndashboard/PTasksPage";
import DocHealthPage from "./components/DoctorDashboard/DHealthRecordsPage";
import DocTaskPage from "./components/DoctorDashboard/DTasksPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Patienten/MedicalHistory"
            element={<MedicalHistoryPage />}
          />
          <Route path="/Patienten/Appointment" element={<AppointmentPage />} />

          <Route path="/Patienten/HeathRecords" element={<PatTasks />} />

          <Route path="/Doctor/Dashboard" element={<DashboardPage />} />
          <Route
            path="/Doctor/AppointmentManager"
            element={<AppointmentManager />}
          />
          <Route path="/Doctor/HealthRecords" element={<DocHealthPage />} />
          <Route path="/Doctor/Tasks" element={<DocTaskPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
