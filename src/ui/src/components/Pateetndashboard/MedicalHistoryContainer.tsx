import React, { useState, useEffect } from "react";
import "./css/styles.css";
import {
  getTaskIDs,
  createHealthRecord,
  Record,
  completeTask,
  GetHealthRecord,
  DOcHeathRecord,
  leavePractice,
  DeleteHealthRecord,
  editHealthRecord,
} from "../API";

const MedicalHistoryContainer: React.FC = () => {
  const [PatHelthRecord, setPatHelthRecord] = useState<DOcHeathRecord | null>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isleave, setIsleave] = useState<boolean>(false);
  const [isready, setIsready] = useState<boolean>(false);


  const [newRecord, setNewRecord] = useState<Record>({
    username: sessionStorage.getItem("username"),
    allergies: [],
    medicalHistory: [],
    diagnoses: [],
    medicine: [],
    healthInsuranceName: "",
  });

  const [newAllergy, setNewAllergy] = useState<string>("");
  const [newMedicalHistory, setNewMedicalHistory] = useState<string>("");
  const [newDiagnosis, setNewDiagnosis] = useState<string>("");
  const [newMedicine, setNewMedicine] = useState<string>("");

  const accessToken = sessionStorage.getItem("accessToken");
  const username = sessionStorage.getItem("username");

  const handleAllergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAllergy(e.target.value);
  };

  const handleMedicalHistoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMedicalHistory(e.target.value);
  };

  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiagnosis(e.target.value);
  };

  const handleMedicineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMedicine(e.target.value);
  };

  
  const addAllergy = () => {
    if (newAllergy.trim() !== "") {
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        allergies: [...prevRecord.allergies, newAllergy.trim()],
      }));
      setNewAllergy(""); // Clear the input field
    }
  };

  const addMedicalHistory = () => {
    if (newMedicalHistory.trim() !== "") {
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        medicalHistory: [
          ...prevRecord.medicalHistory,
          newMedicalHistory.trim(),
        ],
      }));
      setNewMedicalHistory(""); // Clear the input field
    }
  };

  const addDiagnosis = () => {
    if (newDiagnosis.trim() !== "") {
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        diagnoses: [...prevRecord.diagnoses, newDiagnosis.trim()],
      }));
      setNewDiagnosis(""); // Clear the input field
    }
  };

  const addMedicine = () => {
    if (newMedicine.trim() !== "") {
      setNewRecord((prevRecord) => ({
        ...prevRecord,
        medicine: [...prevRecord.medicine, newMedicine.trim()],
      }));
      setNewMedicine(""); // Clear the input field
    }
  };
  const removeAllergy = (allergy: string) => {
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      allergies: prevRecord.allergies.filter((item) => item !== allergy),
    }));
  };

  const removeMedicalHistory = (history: string) => {
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      medicalHistory: prevRecord.medicalHistory.filter(
        (item) => item !== history
      ),
    }));
  };

  const removeDiagnosis = (diagnosis: string) => {
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      diagnoses: prevRecord.diagnoses.filter((item) => item !== diagnosis),
    }));
  };

  const removeMedicine = (meditem: string) => {
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      medicine: prevRecord.medicine.filter((item) => item !== meditem),
    }));
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await editHealthRecord(username, accessToken);
      alert("Health Record wurde erfolgreich geändert");
    } else {
      await createHealthRecord(username, accessToken);
      alert("Health Record wurde erfolgreich erstellt");
    }
    setIsready(true);
  };

  const handleComplete = async () => {
    const fetchedTaskId =  await getTaskIDs(username, accessToken);
    if (fetchedTaskId) {
      console.log(fetchedTaskId)
      await completeTask(fetchedTaskId, newRecord, accessToken);
      alert("Health Record wurde erfolgreich gesendet");

    } else {
      console.error("No task ID found.");
      alert("Health Record wurde erfolgreich gesendet");
    }
    setIsready(false);

  };

  const handleDelete = async () => {
    if (PatHelthRecord) {
      if (isleave) {
        await DeleteHealthRecord(username, accessToken);
        setPatHelthRecord(null); // Reset the state after deletion
        alert("Health Record wurde erfolgreich gelöscht");
      } else {
        await leavePractice(username, accessToken);
        setIsleave(true);
      }
    }
  };
  const handleisedited = () => {
    if (PatHelthRecord) {
      setNewRecord({
        username: PatHelthRecord.username,
        allergies: [...PatHelthRecord.allergies],
        medicalHistory: [...PatHelthRecord.medicalHistory],
        diagnoses: [...PatHelthRecord.diagnoses],
        medicine: [...PatHelthRecord.medicines],
        healthInsuranceName: PatHelthRecord.healthInsurance,
      });
      setPatHelthRecord(null);
      setIsEditing(true);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await GetHealthRecord(accessToken, username);
      setPatHelthRecord(data || null);
    };

    fetchTasks();
  }, []);
  return (
    <div className="Gesdivs">
      <div className="Titles">
        <h1>Gesundheitsdaten</h1>
      </div>
      <main className="medicalinpputs">
        <div className="pateinRecord">
          <h3>Krankheiten</h3>
          {PatHelthRecord ? (
            <div>
              {PatHelthRecord.medicalHistory.map((item, index) => (
                <div key={index} className="item">
                  <i className="fas fa-stethoscope"></i> {item}
                </div>
              ))}
            </div>
          ) : (
            <div className="additem">
              <input
                type="text"
                value={newMedicalHistory}
                onChange={handleMedicalHistoryChange}
              />
              <button type="button" onClick={addMedicalHistory}>
                +
              </button>
            </div>
          )}
          {newRecord.medicalHistory.map((item, index) => (
            <div
              className="item"
              key={index}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <i className="fas fa-stethoscope"></i> {item}
              <button onClick={() => removeMedicalHistory(item)}>-</button>
            </div>
          ))}
        </div>

        <div className="Medikamentenliste">
          <h3>Medikamentenliste</h3>
          {PatHelthRecord ? (
            <div>
              {PatHelthRecord.medicines.map((medikament, index) => (
                <div key={index} className="itemlist">
                  <i className="fas fa-pills medicine-icon medicine"></i>
                  {medikament}
                </div>
              ))}
            </div>
          ) : (
            <div className="additem">
              <input
                type="text"
                value={newMedicine}
                onChange={handleMedicineChange}
              />
              <button type="button" onClick={addMedicine}>
                +
              </button>
            </div>
          )}
          {newRecord.medicine.map((medikament, index) => (
            <div key={index} className="itemlist">
              <i className="fas fa-pills medicine-icon medicine"></i>
              {medikament}
              <button onClick={() => removeMedicine(medikament)}>-</button>
            </div>
          ))}
        </div>
        <div className="Medikamentenliste">
          <h3>Allergien</h3>
          {PatHelthRecord ? (
            <div>
              {PatHelthRecord.allergies.map((allergie, index) => (
                <div key={index} className="itemlist">
                  <i className="fas fa-allergies allergy-icon allergy"></i>
                  {allergie}
                </div>
              ))}
            </div>
          ) : (
            <div className="additem">
              <input
                type="text"
                value={newAllergy}
                onChange={handleAllergyChange}
              />
              <button type="button" onClick={addAllergy}>
                +
              </button>
            </div>
          )}
          {newRecord.allergies.map((allergie, index) => (
            <div
              key={index}
              className="itemlist"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <i className="fas fa-allergies allergy-icon allergy"></i>

              {allergie}
              <button onClick={() => removeAllergy(allergie)}>-</button>
            </div>
          ))}
        </div>

        <div>
          <h2>Laborergebnisse und Diagnosen</h2>
          {PatHelthRecord ? (
            <div>
              {PatHelthRecord.diagnoses.map((test, index) => (
                <div key={index} className="additem">
                  <strong>{test}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="additem">
              <input
                type="text"
                value={newDiagnosis}
                onChange={handleDiagnosisChange}
              />
              <button type="button" onClick={addDiagnosis}>
                +
              </button>
            </div>
          )}
          {newRecord.diagnoses.map((test, index) => (
            <div key={index} className="additem">
              <strong>{test}</strong>
              <button onClick={() => removeDiagnosis(test)}>-</button>
            </div>
          ))}
        </div>
      </main>
      <div className="Laborergebnisse">
        <h2>Krankenversicherung</h2>
        {PatHelthRecord === null ? (
          <select
            value={newRecord.healthInsuranceName}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                healthInsuranceName: e.target.value,
              })
            }
          >
            <option value=""></option>
            <option value="Health Insurance A">Health Insurance A</option>
            <option value="Health Insurance B">Health Insurance B</option>
            <option value="Health Insurance C">Health Insurance C</option>
            <option value="Health Insurance D">Health Insurance D</option>
          </select>
        ) : (
          <p>{PatHelthRecord?.healthInsurance}</p>
        )}
      </div>
      <div className="medbtns">
        {PatHelthRecord == null ? (
          isready ? (
            <button onClick={handleComplete}>Senden</button>

          ) : (
            <button onClick={handleSubmit}>Speichern</button>

          )
        ) : (
          <div className="extrabtns">
            <button onClick={handleDelete} style={{ marginRight: "10px" }}>
              {isleave ? "Löschen" : "Verlassen der Praxis"}
            </button>
            <button onClick={handleisedited}>Bearbeiten</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryContainer;
