import React, { useState } from "react";

interface Medication {
  value: string;
  label: string;
}

const Rezeptver: React.FC = () => {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [CurrentdMedications, setCurrentMedications] = useState<string[] | null>(null);

  const [status, setStatus] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const medications: Medication[] = [
    { value: "med1", label: "Medikament 1" },
    { value: "med2", label: "Medikament 2" },
    { value: "med3", label: "Medikament 3" },
    // Add more medications as needed
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedMedications(
      (prev) =>
        prev.includes(value)
          ? prev.filter((med) => med !== value) // Remove if already selected
          : [...prev, value] // Add if not selected
    );
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const randomApproval = Math.random() > 0.5; // 50% chance of approval
    setIsApproved(randomApproval);
    setCurrentMedications(selectedMedications);
    const medicationList = selectedMedications.join(", ");
    setStatus(
      `Das Rezept für ${medicationList} ${
        randomApproval ? "wurde genehmigt" : "wird bearbeitet"
      }`
    );
  };

  return (
    <div className="rezpage">
      <h1>Rezeptverwaltung</h1>
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Wählen Sie Medikamente:</legend>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {medications.map((medication) => (
              <li key={medication.value}>
                <label>
                  <input
                    type="checkbox"
                    value={medication.value}
                    checked={selectedMedications.includes(medication.value)}
                    onChange={() => handleCheckboxChange(medication.value)}
                  />
                  {medication.label}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <br />
        <button type="submit">Rezept anfordern</button>
      </form>
      {status && (
        <div className={`status ${isApproved ? "approved" : "pending"}`}>
          {status}
        </div>
      )}

      {CurrentdMedications && (
        <div className="termin">
          <h1>  Rezeptver </h1>
          <h3>   {status} </h3>

          <div className="termindatamed">
          {CurrentdMedications.map(med => (
              <label>{med}</label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rezeptver;
