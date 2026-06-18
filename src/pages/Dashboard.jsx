import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            AI Interview Prep Platform
          </h1>

          <p className="text-muted">
            Practice interviews, get AI feedback,
            and improve your skills.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-md-4">

            <div className="card shadow-lg border-0 h-100">

              <div className="card-body text-center">

                <h3>🎯 Start Interview</h3>

                <p className="text-muted">
                  Generate AI-powered interview
                  questions for any role.
                </p>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate("/interview/start")
                  }
                >
                  Start Now
                </button>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow-lg border-0 h-100">

              <div className="card-body text-center">

                <h3>📊 History</h3>

                <p className="text-muted">
                  View your previous interviews
                  and scores.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/history")
                  }
                >
                  View History
                </button>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow-lg border-0 h-100">

              <div className="card-body text-center">

                <h3>🚪 Logout</h3>

                <p className="text-muted">
                  Sign out securely.
                </p>

                <button
                  className="btn btn-danger"
                  onClick={() => {

                    localStorage.removeItem("token");
                    navigate("/login");

                  }}
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;