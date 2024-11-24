import { apiCall } from "./TokenUtil";

const BASE_URL = "http://localhost:8080/api";
const APPOINTMENT_URL = "http://localhost:8080/api/appoint";

export interface Doctor {
  username: string;
  firstname: string;
  lastname: string;
}
export interface ReseveAppoiment {
  datum: string;
  time: string;
}

export interface AppointmentRecord {

  patientName: string;
  docName: string;
  date: string;
  time: string;
}


export interface Task {
  id: string;
  processDefinitionKey: string;
  processName: string;
  formVersion: number;
  isFirst: boolean;

}

export interface Record {
  username: string | null;
  allergies: string[];
  medicalHistory: string[];
  diagnoses: string[];
  medicine: string[];
  healthInsuranceName: string;
}
export interface HeathRecord {
  username: string | null;
  allergies: string[];
  medicalHistory: string[];
  diagnoses: string[];
  medicine: string[];
  healthInsuranceName: string | null;
}
export interface DOcHeathRecord {
  username: string;
  allergies: string[];
  medicalHistory: string[];
  diagnoses: string[];
  medicines: string[];
  healthInsurance: string;
}
export interface TaskItem {
  id: string;
  name: string;
  value: string | boolean | string[];
  type: string;
}
export interface Appointment {
  id: number;
  userId: string;
  patientName: string;
  docName: string;
  date: string;
  time: string;
}

export const GetAllAppioment = async (accessToken: string |  null ,username: string |  null ): Promise<Appointment[]> => {
  try {
    const response = await fetch(`${APPOINTMENT_URL}/findAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data: Appointment[] = await response.json();
      // Filter appointments by doctor's username
      return data.filter((appointment) => appointment.docName === username) || [];
    } else {
      console.error('Failed to fetch appointments by username:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching appointments by username:', error);
    return [];
  }
};

export const fetchDoctors = async (accessToken: string |  null): Promise<Doctor[]> => {
  try {
    const response = await apiCall(
      "http://localhost:8080/api/user/role/Doctor",
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
      console.log(" Doctors " + JSON.stringify(data));
      return data || [];
    } else {
      console.error("Failed to fetch Doctors:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Doctors:", error);
    return [];
  }
};


export const GetResevedAppioment = async (accessToken: string |  null  ): Promise<Appointment[]> => {
  try {
    const response = await fetch(`${APPOINTMENT_URL}/findAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data: Appointment[] = await response.json();
      // Filter appointments by doctor's username
      return data || [];
    } else {
      console.error('Failed to fetch appointments by username:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching appointments by username:', error);
    return [];
  }
};


export const createAppointment = async (accessToken: string |  null ,username: string |  null ): Promise<void> => {
  try {
    const response = await apiCall(APPOINTMENT_URL+"/create/"+username,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      console.error("Appointment Process started successfully");
    } else {
      console.error("Error starting Appointment process");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};






export const createHealthRecord = async (
  username: string | null,
  accessToken: string | null
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/health-records/create/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create health record");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editHealthRecord = async (
  username: string | null,
  accessToken: string | null
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/health-records/edit/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create health record");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const DeleteHealthRecord = async (
  username: string | null,
  accessToken: string | null
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/health-records/delete/${username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create health record");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const leavePractice = async (
  username: string | null,
  accessToken: string | null
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/health-records/leavePractice/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create health record");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getTaskIDs = async (
  username: string | null,
  accessToken: string | null
): Promise<string> => {
  try {
    const response = await fetch(
      `${BASE_URL}/tasks?assignee=${username}&group`,
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
      const ids = data.items[0].id;
      return ids;

      throw new Error("No tasks found");
    } else {
      throw new Error("Failed to fetch tasks");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const completeTask = async (
  taskId: string,
  record: Record | HeathRecord,
  accessToken: string | null
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error("Failed to complete task");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const completeTaskAapoiment = async (
  taskId: string,
  appoiment: AppointmentRecord,
  accessToken: string | null
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(appoiment),
    });

    if (!response.ok) {
      throw new Error("Failed to complete task");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getdocTaskIDs = async (
  accessToken: string | null
): Promise<Task[]> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks?assignee=&group=Doctor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      console.error("Failed to fetch tasks");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
export const getPatTaskIDs = async (
  username: string | null,
  accessToken: string | null
): Promise<Task[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/tasks?assignee=${username}&group`,
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
      return data.items;
    } else {
      console.error("Failed to fetch tasks");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getTaskVariables = async (
  taskId: string,
  accessToken: string | null
): Promise<TaskItem[] | null> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/variables`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch task variables");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const completeDOcTask = async (
  taskId: string,
  review: string,
  isApproved: boolean,
  accessToken: string | null
): Promise<void> => {
  const sampleData = {
    isApproved: isApproved,
    changeRequest_c: review,
  };

  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(sampleData),
    });

    if (!response.ok) {
      console.error("Failed to complete task");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const assigmentask = async (
  taskId: string,
  username: string | null,
  accessToken: string | null
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/tasks/${taskId}/assign/${username}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to complete task");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetHealthRecords = async (
  accessToken: string | null
): Promise<DOcHeathRecord[] | null> => {
  try {
    const response = await fetch(`${BASE_URL}/health-records/findAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch task variables");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const GetHealthRecord = async (
  accessToken: string | null,
  username: string | null
): Promise<DOcHeathRecord | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/health-records/find/${username}`,
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

      return data;
    } else {
      console.error("Failed to fetch task variables");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
