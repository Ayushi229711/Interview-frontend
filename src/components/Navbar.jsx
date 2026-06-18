import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/dashboard"
        >
          AI Interview Prep
        </Link>

        <div className="ms-auto">

          <Link
            className="btn btn-outline-light me-2"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="btn btn-outline-light me-2"
            to="/history"
          >
            History
          </Link>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;