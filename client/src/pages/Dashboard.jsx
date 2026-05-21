import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <div style={{ padding: "40px" }}>

      <h1>Dashboard</h1>

      <p>Welcome to Team Task Manager</p>

      <button>
        Create Project
      </button>

      <br /><br />

      <button>
        Create Task
      </button>

      <br /><br />

      <Link to="/">
        Logout
      </Link>

    </div>

  );
}

export default Dashboard;