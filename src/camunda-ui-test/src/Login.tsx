import React, { useState } from "react";
import "./login.css";

const Login: React.FC = () => {
  const [isSignUpActive, setSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setSignUpActive(true);
  };

  const handleSignInClick = () => {
    setSignUpActive(false);
  };

  return (
    <div
      className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Registrieren</h1>
          <input type="email" placeholder="E-Mail Adresse" />
          <input type="password" placeholder="Passwort" />
          <input type="password" placeholder="Passwort bestätigen" />
          <button type="button">Account erstellen</button>
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
        <form action="#">
          <h1>Willkommen zurück</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="button">Anmeldung</button>
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
  );
};

export default Login;
