import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./login.css";

const Login: React.FC = () => {
  const [isSignUpActive, setSignUpActive] = useState(false);
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("Patienten");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "de" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleSignUpClick = () => {
    setSignUpActive(true);
  };

  const handleSignInClick = () => {
    setSignUpActive(false);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const credentials = { email: email.trim(), password: password.trim() };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.jwt);
        // Optionally, fetch user data here
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }

    const userData = {
      email: email.trim(),
      password: password.trim(),
      firstname: "test",
      lastname: "test",
      role: "doctor",
      age: 30,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.jwt);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  return (
    <div className="loginpage">  

    <div
      className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      id="container"
    >
      <button
        style={{ color: "red" }}
        onClick={() => {
          toggleLanguage();
        }}
      >
        Toggle langauage
      </button>
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegister}>
          <h1>{t("register")}</h1>
          <input type="email" placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder={t("password")}  value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <input type="password" placeholder={t("confirmPassword")} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
          <button type="submit"  className="btnlog">{t("createAccount")}</button>
       

          <a
            href="#"
            id="signIn"
            className="bluetxt"

            onClick={handleSignInClick}
          >
            {t("back")}
          </a>
        

        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>{t("welcomeBack")}</h1>
          <input type="email" placeholder={t("email")}  value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <div className="roles">
          <div>
  <input type="radio" id="user" name="userType" value="Patienten" checked={userType === "Patienten"} onChange={(e) => setUserType(e.target.value)}/>
  <label htmlFor="user">{t("Patienten")}</label>
  </div>
  <div>
  <input type="radio" id="doctor" name="userType" value="Doctor" checked={userType === "Doctor"} onChange={(e) => setUserType(e.target.value)}/>
  <label htmlFor="doctor">{t("Doctor")}</label>
  </div>

</div>

          <button type="submit">{t("login")}</button>
 
          <a href="#">{t("forgotPassword")}</a>

          <a
            href="#"
            id="signUp"
            className="bluetxt"
            onClick={handleSignUpClick}
          >
            {t("noAccount")}
          </a>
       

        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left"></div>
          <div className="overlay-panel overlay-right"></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
