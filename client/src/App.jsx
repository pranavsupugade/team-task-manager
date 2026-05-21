import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const savedUser = JSON.parse(
      window.localStorage.getItem("user")
    );

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {

      alert("Login Successful");

      navigate("/dashboard");

    } else {

      alert("Invalid Credentials");

    }
  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      gap: "10px",
      background: "#f4f4f4"
    }}>

      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
      }}>

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <Link to="/signup">
          Go To Signup
        </Link>

        <button
          onClick={() => {
            window.localStorage.clear();
            alert("Storage Cleared");
          }}
        >
          Reset Data
        </button>

      </div>

    </div>
  );
}

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = () => {

    if (!name || !email || !password) {

      alert("Fill all fields");

      return;
    }

    const user = {
      name,
      email,
      password
    };

    window.localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Signup Successful");

    navigate("/");
  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      gap: "10px",
      background: "#f4f4f4"
    }}>

      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
      }}>

        <h1>Signup</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Signup
        </button>

        <Link to="/">
          Go To Login
        </Link>

      </div>

    </div>
  );
}

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    window.localStorage.getItem("user")
  );

  const [projectName, setProjectName] = useState("");

  const [projects, setProjects] = useState([]);

  const [taskTitle, setTaskTitle] = useState("");

  const [assignedTo, setAssignedTo] = useState("");

  const [status, setStatus] = useState("Pending");

  const [tasks, setTasks] = useState([]);

  const createProject = () => {

    if (!projectName) {

      alert("Enter Project Name");

      return;
    }

    const newProject = {
      id: Date.now(),
      name: projectName
    };

    setProjects([...projects, newProject]);

    setProjectName("");
  };

  const createTask = () => {

    if (!taskTitle || !assignedTo) {

      alert("Fill all task fields");

      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      assignedTo,
      status
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");
    setAssignedTo("");
    setStatus("Pending");
  };

  const logout = () => {

    navigate("/");
  };

  return (

    <div style={{
      padding: "30px",
      fontFamily: "Arial",
      background: "#f4f4f4",
      minHeight: "100vh"
    }}>

      <h1>
        Welcome {user?.name}
      </h1>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px"
      }}>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "200px"
        }}>

          <h2>Total Projects</h2>

          <p>{projects.length}</p>

        </div>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "200px"
        }}>

          <h2>Total Tasks</h2>

          <p>{tasks.length}</p>

        </div>

      </div>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>

        <h2>Create Project</h2>

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <button onClick={createProject}>
          Create Project
        </button>

      </div>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>

        <h2>Projects</h2>

        {
          projects.map((project) => (

            <div
              key={project.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px"
              }}
            >

              <h3>{project.name}</h3>

              <button
                onClick={() => {

                  const updatedProjects =
                    projects.filter(
                      (p) => p.id !== project.id
                    );

                  setProjects(updatedProjects);
                }}
              >
                Delete
              </button>

            </div>

          ))
        }

      </div>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>

        <h2>Create Task</h2>

        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Assign Member"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <br /><br />

        <button onClick={createTask}>
          Create Task
        </button>

      </div>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px"
      }}>

        <h2>Tasks</h2>

        {
          tasks.map((task) => (

            <div
              key={task.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px"
              }}
            >

              <h3>{task.title}</h3>

              <p>
                Assigned To: {task.assignedTo}
              </p>

              <p
                style={{
                  color:
                    task.status === "Completed"
                      ? "green"
                      : task.status === "In Progress"
                      ? "orange"
                      : "red"
                }}
              >
                Status: {task.status}
              </p>

              <button
                onClick={() => {

                  const updatedTasks =
                    tasks.filter(
                      (t) => t.id !== task.id
                    );

                  setTasks(updatedTasks);
                }}
              >
                Delete Task
              </button>

            </div>

          ))
        }

      </div>

    </div>
  );
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;