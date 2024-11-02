import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pdashboard from "./components/Pateetndashboard/Pdashboard";
import Terminbuchung from "./components/Pateetndashboard/terminbuchung";
import Rezeptanforderungen from "./components/Pateetndashboard/rezeptanforderungen";
import "./App.css";

function App() {

  return (
    <>
      <Router>
  
          <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Patienten/gesundheitsdaten" element={<Pdashboard />} />
                <Route path="/Patienten/terminbuchung" element={<Terminbuchung />} />
                <Route path="/Patienten/rezeptanforderungen" element={<Rezeptanforderungen />} />

            </Routes>
     
        </Router>

    </>
  );
}

export default App;
