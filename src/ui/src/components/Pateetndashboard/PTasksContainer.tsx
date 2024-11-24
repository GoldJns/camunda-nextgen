import React, { useEffect, useState } from "react";
import {
  getTaskVariables,
  completeTask,
  getPatTaskIDs,
  Task,
  TaskItem,
  HeathRecord,
} from "../API"; // Adjust the path as necessary

const PatTasks: React.FC = () => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [review, setreview] = useState<string>("");
  const [isfinish, setIsfinfish] = useState<boolean>(false);
  const [userTasksItem, setUserTasksItem] = useState<TaskItem[]>([]);
  const [taskId, setTaskId] = useState<string>("");
  const [loading, setTloading] = useState(true);

  const [healthRecord, setHealthRecord] = useState<HeathRecord>({
    username: null,
    allergies: [],
    medicalHistory: [],
    diagnoses: [],
    medicine: [],
    healthInsuranceName: null,
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
      setHealthRecord((prevRecord) => ({
        ...prevRecord,
        allergies: [...prevRecord.allergies, newAllergy.trim()],
      }));
      setNewAllergy(""); // Clear the input field
    }
  };

  const addMedicalHistory = () => {
    if (newMedicalHistory.trim() !== "") {
      setHealthRecord((prevRecord) => ({
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
      setHealthRecord((prevRecord) => ({
        ...prevRecord,
        diagnoses: [...prevRecord.diagnoses, newDiagnosis.trim()],
      }));
      setNewDiagnosis(""); // Clear the input field
    }
  };

  const addMedicine = () => {
    if (newMedicine.trim() !== "") {
      setHealthRecord((prevRecord) => ({
        ...prevRecord,
        medicine: [...prevRecord.medicine, newMedicine.trim()],
      }));
      setNewMedicine(""); // Clear the input field
    }
  };
  const removeAllergy = (allergy: string) => {
    setHealthRecord((prevRecord) => ({
      ...prevRecord,
      allergies: prevRecord.allergies.filter((item) => item !== allergy),
    }));
  };

  const removeMedicalHistory = (history: string) => {
    setHealthRecord((prevRecord) => ({
      ...prevRecord,
      medicalHistory: prevRecord.medicalHistory.filter(
        (item) => item !== history
      ),
    }));
  };
  const removeDiagnosis = (diagnosis: string) => {
    setHealthRecord((prevRecord) => ({
      ...prevRecord,
      diagnoses: prevRecord.diagnoses.filter((item) => item !== diagnosis),
    }));
  };

  const removeMedicine = (meditem: string) => {
    setHealthRecord((prevRecord) => ({
      ...prevRecord,
      medicine: prevRecord.medicine.filter((item) => item !== meditem),
    }));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getPatTaskIDs(username, accessToken);
      const filteredTasks = tasks.filter((task) => task.formVersion >= 3);

      setUserTasks(filteredTasks);

      if (filteredTasks.length > 0) {
        setTaskId(filteredTasks[0].id);
        fetchTaskVariables(filteredTasks[0].id);
        setTloading(false)
      }
    };

    fetchTasks();
  }, [accessToken ,isfinish]);

  const fetchTaskVariables = async (id: string) => {
    console.log(id);
    const variables = await getTaskVariables(id, accessToken);
    if (variables) {
      const hasMapType = variables.some((item) => item.type === "MAP");
      if (!hasMapType) {
        setUserTasksItem(variables);
        populateHealthRecord(variables);
      } else {
        setUserTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    }
  };

  const populateHealthRecord = (items: TaskItem[]) => {
    const newHealthRecord: HeathRecord = {
      username: null,
      allergies: [],
      medicalHistory: [],
      diagnoses: [],
      medicine: [],
      healthInsuranceName: null,
    };

    items.forEach((item) => {
      switch (item.name) {
        case "username":
          newHealthRecord.username = item.value as string; // Assuming value is a string
          break;
        case "allergies":
          newHealthRecord.allergies = item.value as string[]; // Assuming value is an array of strings
          break;
        case "medicalHistory":
          newHealthRecord.medicalHistory = item.value as string[];
          break;
        case "diagnoses":
          newHealthRecord.diagnoses = item.value as string[];
          break;
        case "medicine":
          newHealthRecord.medicine = item.value as string[];
          break;
        case "healthInsuranceName":
          newHealthRecord.healthInsuranceName = item.value as string;
          break;
        case "changeRequest_c":
          setreview(item.value as string);
          break;
        default:
          break;
      }
    });

    setHealthRecord(newHealthRecord);
  };

  const approveClick = async () => {
      await completeTask(taskId, healthRecord, accessToken);
      setIsfinfish(true)
    alert("Health Record wurde Akzeptiert");
  };

  return (
    <div className="Gesdivs">
      <div className="Titles">
        <h1>Health Record </h1>
      </div>
      <div className="heathtable">
        {userTasks.length > 0 ? (
          <div className="patien-card">
            <h1> Änderungen gemäß Arztablehnung: {review}</h1>
            <hr />




            <h2> Patient Name: {healthRecord.username}</h2>
            <h4>{healthRecord.healthInsuranceName}</h4>

            <hr />
            <div className="detaiels">
              <h6> Allergien</h6>

              {healthRecord.allergies.map((allergie, index) => (
                <div
                  key={index}
                  className="itemlist"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {allergie}
                  <button onClick={() => removeAllergy(allergie)}>-</button>
                </div>
              ))}
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
              <hr />

              <h6> Krankengeschichte</h6>

              {healthRecord.medicalHistory.map((item, index) => (
                <div
                  className="item"
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {item}
                  <button onClick={() => removeMedicalHistory(item)}>-</button>
                </div>
              ))}
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
              <hr />

              <h6>Laborergebnisse</h6>
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
              {healthRecord.diagnoses.map((item, index) => (
                <div
                  className="item"
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {item}
                  <button onClick={() => removeDiagnosis(item)}>-</button>
                </div>
              ))}

              <hr />

              <h6>Medikamentenliste</h6>
            
              {healthRecord.medicine.map((medikament, index) => (
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {medikament}
                  <button onClick={() => removeMedicine(medikament)}>-</button>
                </div>
              ))}
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
            </div>
            <hr />

            <div className="buttons">
              <button onClick={approveClick} className="accept-btn">
                Genehmigen
              </button>
            </div>
          </div>
        ) : (
          <div className="no-tasks">
               {loading ? (   <h2>Loading...</h2>
             
             ) : (
             
              <h2>Keine Tasks vorhanden</h2>
             )}
          
          </div>
        )}
      </div>
      {userTasksItem.length > 0 && (
        <span></span>

)}
    </div>
  );
};

export default PatTasks;
