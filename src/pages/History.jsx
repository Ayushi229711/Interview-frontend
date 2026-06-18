import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function History() {

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {

    try {

      const response =
        await API.get("/interview/dashboard");

      setSessions(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  const totalInterviews = sessions.length;

  const scores = sessions.map(
    (s) => s.score || s.overallScore || 0
  );

  const highestScore =
    scores.length > 0
      ? Math.max(...scores)
      : 0;

  const averageScore =
    scores.length > 0
      ? (
          scores.reduce(
            (sum, score) => sum + score,
            0
          ) / scores.length
        ).toFixed(1)
      : 0;

  if (loading) {

    return (
      <>
        <Navbar />

        <div className="container mt-5 text-center">

          <div
            className="spinner-border text-primary"
            role="status"
          />

          <p className="mt-3">
            Loading History...
          </p>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Interview History
          </h1>

          <p className="text-muted">
            Review your previous interviews and performance.
          </p>

        </div>

        {/* Statistics */}

        <div className="row mb-5">

          <div className="col-md-4 mb-3">

            <div className="card shadow-sm border-primary">

              <div className="card-body text-center">

                <h6 className="text-muted">
                  Total Interviews
                </h6>

                <h2 className="fw-bold">
                  {totalInterviews}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow-sm border-success">

              <div className="card-body text-center">

                <h6 className="text-muted">
                  Highest Score
                </h6>

                <h2 className="fw-bold text-success">
                  {highestScore}
                </h2>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow-sm border-warning">

              <div className="card-body text-center">

                <h6 className="text-muted">
                  Average Score
                </h6>

                <h2 className="fw-bold text-primary">
                  {averageScore}
                </h2>

              </div>

            </div>

          </div>

        </div>

        {sessions.length === 0 ? (

          <div className="alert alert-info text-center">
            No interviews found.
          </div>

        ) : (

          <div className="row">

            {sessions.map((session) => (

              <div
                key={session.sessionId}
                className="col-md-6 mb-4"
              >

                <div className="card shadow-sm border-0 h-100">

                  <div className="card-body">

                    <h4 className="fw-bold">
                      {session.role}
                    </h4>

                    <p className="text-muted">
                      Difficulty: {session.difficulty}
                    </p>

                    <div className="mb-3">

                      <span className="badge bg-success fs-6">
                        Score: {session.score}
                      </span>

                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          `/interview/result/${session.sessionId}`
                        )
                      }
                    >
                      View Report
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        <div className="text-center mt-4">

          <button
            className="btn btn-success me-3"
            onClick={() =>
              navigate("/interview/start")
            }
          >
            New Interview
          </button>

          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Dashboard
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default History;