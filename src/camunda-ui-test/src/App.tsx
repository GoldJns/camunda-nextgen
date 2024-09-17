import { I18nextProvider } from "react-i18next";
import "./App.css";
import Login from "./components/Login";
import i18n from "./i18n/i18n";
import { useState } from "react";

function App() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "de" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <>
          <button
            //style={{ backgroundColor: "white", color: "black" }}
            onClick={() => {
              toggleLanguage();
            }}
          >
            Toggle language
          </button>
          <Login />
        </>
      </I18nextProvider>
    </>
  );
}

export default App;
