import React, { useState } from "react";
import "./login.css";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const [isSignUpActive, setSignUpActive] = useState(false);
  const { t } = useTranslation();

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
          <h1>{t("register")}</h1>
          <input type="email" placeholder={t("email")} />
          <input type="password" placeholder={t("password")} />
          <input type="password" placeholder={t("confirmPassword")} />
          <button type="button">{t("createAccount")}</button>
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
        <form action="#">
          <h1>{t("welcomeBack")}</h1>
          <input type="email" placeholder={t("email")} />
          <input type="password" placeholder={t("password")} />
          <button type="button">{t("login")}</button>
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
  );
};

export default Login;
