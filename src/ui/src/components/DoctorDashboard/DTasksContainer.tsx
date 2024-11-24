import React, { useEffect, useState } from "react";
import "./css/Doctor.css";
import {
  getTaskVariables,
  completeDOcTask,
  getdocTaskIDs,
  Task,
  TaskItem,
  HeathRecord,
} from "../API"; // Adjust the path as necessary

const DocTasks: React.FC = () => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [loading, setTloading] = useState(true);

  const [userTasksItem, setUserTasksItem] = useState<TaskItem[]>([]);
  const [taskId, setTaskId] = useState<string>("");
  const [taskform, setTasktask] = useState<string | null>("");

  const [healthRecord, setHealthRecord] = useState<HeathRecord>({
    username: null,
    allergies: [],
    medicalHistory: [],
    diagnoses: [],
    medicine: [],
    healthInsuranceName: null,
  });

  const [review, setReview] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const tasksPerPage = 5;
  useEffect(() => {
    const fetchTasks = async () => {
      
      const tasks = await getdocTaskIDs(accessToken);
      const filteredTasks = tasks.filter((task) => task.formVersion >= 3);

      setUserTasks(filteredTasks);
      setTotalTasks(userTasks.length);

      if (filteredTasks.length > 0) {
        setTaskId(filteredTasks[0].id);
        setTasktask(filteredTasks[0].processName);
        fetchTaskVariables(filteredTasks[0].id);
        setTloading(false);
      }
    };

    fetchTasks();
  }, [accessToken, userTasks]);

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

  const handleTaskSelect = (id: string) => {
    setTaskId(id);
    fetchTaskVariables(id);
    const selectedTask = userTasks.find((task) => task.id === id);
    if (selectedTask) {
      setTasktask(selectedTask.processName);
    } else {
      setTasktask(null);
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
        default:
          break;
      }
    });

    setHealthRecord(newHealthRecord);
  };

  const rejectClick = async () => {
    await completeDOcTask(taskId, review, false, accessToken);

    alert("Health Record wurde abgelehnt");
  };

  const approveClick = async () => {
    await completeDOcTask(taskId, review, true, accessToken);

    alert("Health Record wurde Akzeptiert");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalTasks / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="Gesdivs">
      <div className="Titles">
        <h1>Health Records </h1>
      </div>
      <div className="heathtable">
        {userTasks.length > 0 ? (
          <div className="patien-card">
            <h5>
              <span className="right">
                Patient Name: {healthRecord.username}
              </span>
              <span className="left">
                {taskform === "createHealthRecord" ? "Neu" : "Vorhanden"}
              </span>
            </h5>

            <h4>{healthRecord.healthInsuranceName}</h4>
            <hr />
            <div className="details">
              <h6> Allergien</h6>

              <div className="d">
                <ul>
                  {healthRecord.allergies.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <hr />

              <h6> Krankengeschichte</h6>

              <div className="d">
                <ul>
                  {healthRecord.medicalHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <hr />

              <h6>Laborergebnisse</h6>

              <div className="d">
                <ul>
                  {healthRecord.diagnoses.map((degitem, index) => (
                    <li key={index}>{degitem}</li>
                  ))}
                </ul>
              </div>
              <hr />

              <h6>Medikamentenliste</h6>

              <div className="d">
                <ul>
                  {healthRecord.medicine.map((meditem, index) => (
                    <li key={index}>{meditem}</li>
                  ))}
                </ul>
              </div>
            </div>
            <hr />

            <div className="txtreject">
              <input
                type="text"
                value={review}
                onChange={handleInputChange}
                placeholder="Geben Sie mehr Informationen ein..."
              />
            </div>
            <div className="buttons">
              <button onClick={rejectClick} className="reject-btn">
                Ablehnen
              </button>
              <button onClick={approveClick} className="accept-btn">
                Genehmigen
              </button>
            </div>
          </div>
        ) : (
          <div className="no-tasks">
            {loading ? (   <h2>Loading...</h2>
             
            ) : (
            
              <h2>Es liegen keine Tasks zur Bearbeitung vor</h2>
            )}
          </div>
        )}
        <div className="task-selection">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>

          <ul>
            {userTasks.map((task, index) => (
              <li key={task.id} onClick={() => handleTaskSelect(task.id)}>
                {currentPage * tasksPerPage - tasksPerPage + index + 1}
              </li>
            ))}
          </ul>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(totalTasks / tasksPerPage)}
          >
            Next
          </button>
        </div>
      </div>
      {userTasksItem.length > 0 && (
  <div>  
      </div>
)}
    </div>
  );
};

export default DocTasks;
