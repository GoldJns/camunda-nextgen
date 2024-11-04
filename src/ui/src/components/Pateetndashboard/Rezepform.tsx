import React, { useState } from "react";

interface Medication {
  value: string;
  label: string;
}

const Rezeptver: React.FC = () => {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [CurrentdMedications, setCurrentMedications] = useState<
    string[] | null
  >(null);

  const [status, setStatus] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const medications: Medication[] = [
    { value: "aspirin", label: "Aspirin" },
    { value: "ibuprofen", label: "Ibuprofen" },
    { value: "acetaminophen", label: "Acetaminophen" },
    { value: "metformin", label: "Metformin" },
    { value: "lisinopril", label: "Lisinopril" },
    { value: "simvastatin", label: "Simvastatin" },
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
    <div className="Gesdiv">
      <div className="Titles">
        <h1>Rezeptverwaltung</h1>
      </div>
      <div className="rezpage">
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
                    <i className="fas fa-pills medicine-icon medicine"></i>

                    {medication.label}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          <br />
          <button type="submit">Rezept anfordern</button>
        </form>

        {CurrentdMedications && (
          <div className="terminnew">
            <h1>
              <i className="fas fa-medkit"></i>
              Rezeptver
            </h1>

            <div className="terminnewdata">
              {CurrentdMedications.map((med) => (
                <label>
                  <i className="fas fa-pills medicine-icon medicine rredcol"></i>
                  {med}
                </label>
              ))}
            </div>

            <div className={`status ${isApproved ? "approved" : "pending"}`}>
              {status}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rezeptver;
