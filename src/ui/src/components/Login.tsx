import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { jwtDecode } from 'jwt-decode';
interface DecodedToken {
  groups: string[]; 
  name: string;
  sub: string;
}

const Login: React.FC = () => {
  const [isSignUpActive, setSignUpActive] = useState(false);
  const navigate = useNavigate();
  
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const getAdminLogin = async (): Promise<string | null> => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "client_credentials");
    formData.append("client_id", "frontend");
    formData.append("client_secret", "BgjLEDcwNjaeKGFOqXyGhuPg32XqFdGF");

    try {
      const response = await fetch(
        "http://keycloak:18080/auth/realms/camunda-platform/protocol/openid-connect/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.access_token; // Return the token
      } else {
        console.error("Admin login failed");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSignUpClick = () => {
    setSignUpActive(true);
  };

  const handleSignInClick = () => {
    setSignUpActive(false);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("grant_type", "password");
    formData.append("client_id", "frontend");
    formData.append("client_secret", "BgjLEDcwNjaeKGFOqXyGhuPg32XqFdGF");

    try {
      const response = await fetch(
        "http://keycloak:18080/auth/realms/camunda-platform/protocol/openid-connect/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("accessToken", data.access_token);
        console.log(data.access_token);
        const decod = jwtDecode<DecodedToken>(data.access_token);
        console.log(decod);

        sessionStorage.setItem("name", decod.name);
        sessionStorage.setItem("userId", decod.sub);

        if(decod.groups.includes(userType)){
          sessionStorage.setItem("username", username);

          if(userType== "Patient"){
            navigate("/Patienten/MedicalHistory");
          }
          if(userType== "Doctor"){
            navigate("/Doctor/Dashboard");
          }

        } else{
          alert("Falsche Usertype")
        }
       
      
      } else {
        alert("Login failed");
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

    const admintoken = await getAdminLogin();
    console.log(admintoken);

    const userData = {
      username: username,
      enabled: true,
      firstName: firstname,
      lastName: lastname,
      email: email,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false,
        },
      ],
      groups: [userType],
    };

    console.log(userData);

    try {
      const response = await fetch(
        "http://keycloak:18080/auth/admin/realms/camunda-platform/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admintoken}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (response) {
        if (response.status == 409) {
          const data = await response.json();
          alert(data.errorMessage);
        } else {
          handleSignInClick();
        }
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
              type="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
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
                  value="Patient"
                  required
                  checked={userType === "Patient"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="user">Patient</label>
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
                <label htmlFor="doctor">Arzt</label>
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
              type="text"
              placeholder="E-Mail Adresse"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                  value="Patient"
                  checked={userType === "Patient"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="user">Patient</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="doctor"
                  name="userType"
                  value="Doctor"
                  required
                  checked={userType === "Doctor"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label htmlFor="doctor">Arzt</label>
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
