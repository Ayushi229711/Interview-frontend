import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function StartInterview() {

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const startInterview = async () => {

    if (!role.trim()) {
      alert("Please enter a role");
      return;
    }

    if (!difficulty) {
      alert("Please select difficulty");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post(
        "/interview/start",
        {
          role,
          difficulty
        }
      );

      const data = response.data;

      localStorage.setItem(
        "questions",
        JSON.stringify(data.questions)
      );

      localStorage.setItem(
        "sessionId",
        data.sessionId
      );

      navigate(`/interview/${data.sessionId}`);

    } catch (error) {

      console.error(error);

      alert("Failed to start interview");

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow-lg border-0">

              <div className="card-body p-5">

                <h1 className="text-center fw-bold mb-3">
                  Start Interview
                </h1>

                <p className="text-center text-muted mb-4">
                  Generate AI-powered interview questions
                  tailored to your role.
                </p>

                <div className="mb-3">

                  <label className="form-label">
                    Job Role
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Java Backend Developer"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Difficulty
                  </label>

                  <select
                    className="form-select"
                    value={difficulty}
                    onChange={(e) =>
                      setDifficulty(e.target.value)
                    }
                  >
                    <option value="">
                      Select Difficulty
                    </option>

                    <option value="Easy">
                      Easy
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="Hard">
                      Hard
                    </option>

                  </select>

                </div>

                <button
                  className="btn btn-success w-100"
                  onClick={startInterview}
                  disabled={loading}
                >
                  {loading
                    ? "Generating Questions..."
                    : "Start Interview"}
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

export default StartInterview;