import React, { useState } from "react";
import "./css/styles.css";
interface Task {
  id: string;
  processDefinitionKey: string;
  creationDate: string;
  formKey: string;
  isFirst: boolean;
}
interface Record {
  username: string | null;
  allergies: string[];
  medicalHealthHistory: string[];
  diagnoses: string[];
  medicines: string[];
  healthInsurance: string;
}
const MedicalHistoryContainer: React.FC = () => {
  const [taskId, setTaskId] = useState<string >("");

  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [newRecord, setNewRecord] = useState<Record>({
    username: sessionStorage.getItem("username"),
    allergies: [],
    medicalHealthHistory: [],
    diagnoses: [],
    medicines: [],
    healthInsurance: "",
  });
  const [newAllergy, setNewAllergy] = useState<string>("");
  const [newMedicalHistory, setNewMedicalHistory] = useState<string>("");
  const [newDiagnosis, setNewDiagnosis] = useState<string>("");
  const [newMedicine, setNewMedicine] = useState<string>("");

  const accessToken = sessionStorage.getItem("accessToken");

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
        medicalHealthHistory: [
          ...prevRecord.medicalHealthHistory,
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
        medicines: [...prevRecord.medicines, newMedicine.trim()],
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
      medicalHealthHistory: prevRecord.medicalHealthHistory.filter((item) => item !== history),
    }));
  };

  const removeDiagnosis = (diagnosis: string) => {
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      diagnoses: prevRecord.diagnoses.filter((item) => item !== diagnosis),
    }));
  };

  const removeMedicine = (medicine: string) => {
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      medicines: prevRecord.medicines.filter((item) => item !== medicine),
    }));
  };
  const handleSubmit = async () => {
    await createHeathrecord();
    const fetchedTaskId = await getTaskIDS(); // Wait for the task ID
    if (fetchedTaskId) {
        await PostCompleteTask(fetchedTaskId); // Use the fetched task ID
    } else {
      console.error("No task ID found.");
    }
   
  };

  /// step 1  post heathRecord with username
  const createHeathrecord = async (): Promise<void> => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/health-records/create/" +
          sessionStorage.getItem("username"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
      } else {
        console.error(" login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      
    }
  };

  /// step 2  get task id

  const getTaskIDS = async (): Promise<string | null> => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/tasks?assignee=" +
          sessionStorage.getItem("username") +
          "&group",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched tasks:", data);

        const firstTask = data.items?.find((task: Task) => task.isFirst);
        if (firstTask) {
          console.log("Fetched task ID:", firstTask.id);
          return firstTask.id;
        } else {
          console.log("No tasks found for the user.");
          return null;

        }
      } else {
        console.error(" login failed");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  /// step 3  post complete task with task id
  const PostCompleteTask = async (taskid: string): Promise<void> => {
    const sampledat ={ 
      "username": sessionStorage.getItem("username"),
      "allergies": newRecord.allergies.join(","),
      "chronicConditions": newRecord.medicalHealthHistory.join(","),
      "surgeries": newRecord.medicines.join(","),
      "healthInsuranceName": newRecord.healthInsurance,
    }
    console.log(sessionStorage.getItem("username"))
    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskid}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(sampledat),
        }
      );

      if (response.ok) {
      } else {
        console.error(" login failed");
       
      }
    } catch (error) {
      console.error("Error:", error);
    
    }
  };

  return (
    <div className="Gesdiv">
      <div className="Titles">
        <h1>Gesundheitsdaten</h1>
      </div>
      <main>
        <div className="pateinRecord">
          <h3>Krankengeschichte</h3>
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
          {newRecord.medicalHealthHistory.map((item, index) => (
            <div className="item" key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <i className="fas fa-stethoscope"></i> {item}
            <button  onClick={() => removeMedicalHistory(item)}>-</button>

            </div>
          ))}
        </div>

        <section className="secondcol">
          <div className="Medikamentenliste">
            <h3>Medikamentenliste</h3>
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
            {newRecord.medicines.map((medikament, index) => (
              <div key={index} className="itemlist">
                <i className="fas fa-pills medicine-icon medicine"></i>
                {medikament}
                <button  onClick={() => removeMedicine(medikament)}>-</button>

              </div>
            ))}
          </div>
          <div className="Medikamentenliste">
            <h3>Allergien</h3>
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
            {newRecord.allergies.map((allergie, index) => (
              <div key={index} className="itemlist" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <i className="fas fa-allergies allergy-icon allergy"></i>

                {allergie}
                <button   onClick={() => removeAllergy(allergie)}>-</button>

              </div>
            ))}
          </div>
        </section>
        <div className="Laborergebnisse">
          <h2>Laborergebnisse und Diagnosen</h2>
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
       
          {newRecord.diagnoses.map((test, index) => (
            <div key={index} className="additem">
              <strong>{test}</strong>
              <button onClick={() => removeDiagnosis(test)}>-</button>
 
            </div>
          ))}
        </div>
        <div className="Laborergebnisse">
          <h2>Krankenversicherung</h2>
          <input
            type="text"
            value={newRecord.healthInsurance}
            onChange={(e) => setNewRecord({ ...newRecord, healthInsurance: e .target.value })}
            placeholder="Enter Health Insurance"
          />

        </div>
      </main>
      <button onClick={handleSubmit}>
        Neuen Gesundheitsdatensatz hinzufügen
      </button>
    </div>
  );
};

export default MedicalHistoryContainer;
