import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const [search, setSearch] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/tasks"
      );

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8000/api/tasks",
        {
          title,
          description,
          status,
        }
      );

      alert("Task Added Successfully");

      setTitle("");
      setDescription("");
      setStatus("Pending");

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert("Failed to add task");
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {

      await axios.delete(
        `http://localhost:8000/api/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, currentStatus) => {

    let newStatus = "Pending";

    if (currentStatus === "Pending") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Completed";
    }

    try {

      await axios.put(
        `http://localhost:8000/api/tasks/${id}`,
        {
          status: newStatus,
        }
      );

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // FILTER TASKS
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // COUNTS
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>

        <h1
          style={{
            fontSize: "48px",
            color: "#4f46e5",
            marginBottom: "10px",
          }}
        >
          Team Task Manager
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "18px",
          }}
        >
          Organize • Manage • Track Tasks
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >

        <div style={cardStyle}>
          <h1 style={numberStyle}>{totalTasks}</h1>
          <p>Total Tasks</p>
        </div>

        <div style={cardStyle}>
          <h1 style={numberStyle}>{completedTasks}</h1>
          <p>Completed</p>
        </div>

        <div style={cardStyle}>
          <h1 style={numberStyle}>{pendingTasks}</h1>
          <p>Pending</p>
        </div>
      </div>

      {/* ADD TASK */}
      <div style={formContainer}>

        <h1 style={{ marginBottom: "20px" }}>
          Add New Task
        </h1>

        <form onSubmit={addTask}>

          <input
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />

          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              ...inputStyle,
              height: "120px",
            }}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button type="submit" style={buttonStyle}>
            Add Task
          </button>

        </form>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          ...inputStyle,
          marginBottom: "30px",
        }}
      />

      {/* TASK LIST */}
      <h1 style={{ marginBottom: "20px" }}>
        Task List
      </h1>

      {
        filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              style={taskCard}
            >

              <h2>{task.title}</h2>

              <p>{task.description}</p>

              <p>
                <strong>Status:</strong> {task.status}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >

                <button
                  onClick={() =>
                    updateStatus(task._id, task.status)
                  }
                  style={updateButton}
                >
                  Update Status
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  style={deleteButton}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )
      }

    </div>
  );
}

// STYLES

const cardStyle = {
  flex: "1",
  minWidth: "200px",
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const numberStyle = {
  fontSize: "40px",
  color: "#4f46e5",
};

const formContainer = {
  background: "#fff",
  padding: "30px",
  borderRadius: "15px",
  marginBottom: "30px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  padding: "15px 25px",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer",
};

const taskCard = {
  background: "#fff",
  padding: "25px",
  marginBottom: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const updateButton = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteButton = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Dashboard;