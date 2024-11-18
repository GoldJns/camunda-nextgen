import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pdashboard from "./components/Pateetndashboard/Pdashboard";
import Terminbuchung from "./components/Pateetndashboard/terminbuchung";
import Rezeptanforderungen from "./components/Pateetndashboard/rezeptanforderungen";
import "./App.css";
import {keycloak} from "./keycloak";
import PrivateRoute from "./PrivateRoute";
import SecuredPage from "./components/SecuredPage";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Nav from "./components/Nav";
import i18n from "./i18n/i18n";
import { useState } from "react";
import { I18nextProvider } from "react-i18next";



function App() {
  const [language, setLanguage] = useState("en");


  const toggleLanguage = () => {
    const newLang = language === "en" ? "de" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };


  return (
    <>
      <ReactKeycloakProvider authClient={keycloak}>
        <I18nextProvider i18n={i18n}>
          <Nav />
          <Router>
            <header className="basicheader">
              <button
                style={{
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={toggleLanguage}
              >
                <img
                  src={language === "en" ? "/de.jfif" : "/en.png"}
                  alt={language}
                  style={{ width: "20px" }}
                />
              </button>
            </header>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/secured"
                element={
                  <PrivateRoute>
                    <SecuredPage />
                  </PrivateRoute>
                }
              />
              <Route path="/gesundheitsdaten" element={<Pdashboard />} />
              <Route path="/terminbuchung" element={<Terminbuchung />} />
              <Route
                path="/rezeptanforderungen"
                element={<Rezeptanforderungen />}
              />
            </Routes>
          </Router>
          </I18nextProvider>
        </ReactKeycloakProvider>
    </>
)}  

export default App;
