import { I18nextProvider } from "react-i18next";
import "./App.css";
import Login from "./components/Login";
import i18n from "./i18n/i18n";

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Login />
      </I18nextProvider>
    </>
  );
}

export default App;
