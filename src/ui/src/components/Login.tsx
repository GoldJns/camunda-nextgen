import React, { useState } from "react";

import "./login.css";

const Login: React.FC = () => {
  const [isSignUpActive, setSignUpActive] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("Patienten");

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
      // cmanuda task 229
      //"http://localhost:8080/engigeßstate/login/start
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
      firstname: firstname,
      lastname: lastname,
      role: userType,
      age: age,
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
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Registrieren</h1>
            <input
              type="text"
              placeholder="Vorname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nachname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Alter"
              onChange={(e) => setAge(parseInt(e.target.value))}
              required
            />

            <input
              type="email"
              placeholder="E-Mail Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Passwort bestätigen"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="roles">
              <div>
                <input
                  type="radio"
                  id="user"
                  name="userType"
                  value="Patienten"
                  checked={userType === "Patienten"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="user">Patienten</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="doctor"
                  name="userType"
                  value="Doctor"
                  checked={userType === "Doctor"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="doctor">Doctor</label>
              </div>
            </div>

            <button type="submit" className="btnlog">
            Account erstellen
            </button>

            <a
              href="#"
              id="signIn"
              className="bluetxt"
              onClick={handleSignInClick}
            >
              Zurück
            </a>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Willkommen zurück</h1>
            <input
              type="email"
              placeholder="E-Mail Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="roles">
              <div>
                <input
                  type="radio"
                  id="user"
                  name="userType"
                  value="Patienten"
                  checked={userType === "Patienten"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="user">Patienten</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="doctor"
                  name="userType"
                  value="Doctor"
                  checked={userType === "Doctor"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="doctor">Doctor</label>
              </div>
            </div>

            <button type="submit">Anmeldung</button>

            <a href="#">Passwort vergessen?</a>

            <a
              href="#"
              id="signUp"
              className="bluetxt"
              onClick={handleSignUpClick}
            >
             Sie haben kein Konto?
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
