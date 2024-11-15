import React from "react";
import "./pdashboard.css";

const Gesundheitsdaten: React.FC = () => {
  const medicalHistoryData = [
    {
      condition: "Hypertension",
      icon: "fas fa-stethoscope",
      description:
        "High blood pressure, requires regular monitoring and medication.",
    },
    {
      condition: "Asthma",
      icon: "fas fa-heartbeat",
      description:
        "Chronic respiratory condition causing wheezing and shortness of breath.",
    },
    {
      condition: "Diabetes Type 2",
      icon: "fas fa-disease",
      description:
        "A metabolic disorder characterized by high blood sugar levels.",
    },
  ];
  const medikamente = ["Aspirin", "Ibuprofen", "Paracetamol"];
  const allergien = ["Nüsse", "Erdnüsse", "Milch"];
  const labortests = [
    {
      title: "Blutzucker",
      description: "Der Blutzuckerspiegel liegt bei 120 mg/dl",
    },
    {
      title: "Cholesterin",
      description: "Der Cholesterinspiegel liegt bei 200 mg/dl",
    },
  ];

  return (
    <div className="Gesdiv">
      <div className="Titles">
        <h1>Gesundheitsdaten</h1>
      </div>
      <main>
        <div className="pateinRecord">
          <h3>Krankengeschichte</h3>
          {medicalHistoryData.map((item, index) => (
            <div className="item" key={index}>
              <i className={item.icon}></i> {item.condition}
              <p className="description">{item.description}</p>
            </div>
          ))}
        </div>

        <section className="secondcol">
          <div className="Medikamentenliste">
            <h3>Medikamentenliste</h3>
            {medikamente.map((medikament, index) => (
              <div key={index} className="itemlist">
                <i className="fas fa-pills medicine-icon medicine"></i>
                {medikament}
              </div>
            ))}
          </div>
          <div className="Medikamentenliste">
            <h3>Allergien</h3>
            {allergien.map((allergie, index) => (
              <div key={index} className="itemlist">
                <i className="fas fa-allergies allergy-icon allergy"></i>

                {allergie}
              </div>
            ))}
          </div>
        </section>
        <div className="Laborergebnisse">
          <h2>Laborergebnisse und Diagnosen</h2>
          {labortests.map((test, index) => (
            <div key={index} className="itemlist">
              <strong>{test.title}</strong>: {test.description}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Gesundheitsdaten;
