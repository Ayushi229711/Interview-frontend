import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Result() {

  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {

    try {

      const response = await API.get(
        `/interview/result/${sessionId}`
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load result");
    }
  };

  if (!result) {

    return (
      <>
        <Navbar />

        <div className="container mt-5">

          <div className="text-center">

            <div
              className="spinner-border text-primary"
              role="status"
            />

            <p className="mt-3">
              Loading Results...
            </p>

          </div>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow-lg border-0 mb-4">

          <div className="card-body text-center p-5">

            <h1 className="fw-bold">
              Interview Report
            </h1>

            <p className="text-muted">
              AI Generated Performance Analysis
            </p>

            <div className="row mt-4">

              <div className="col-md-4">

                <div className="alert alert-primary">

                  <h5>Role</h5>

                  <strong>
                    {result.role}
                  </strong>

                </div>

              </div>

              <div className="col-md-4">

                <div className="alert alert-warning">

                  <h5>Difficulty</h5>

                  <strong>
                    {result.difficulty}
                  </strong>

                </div>

              </div>

              <div className="col-md-4">

                <div className="alert alert-success">

                  <h5>Overall Score</h5>

                  <strong>
                    {result.overallScore}
                  </strong>

                </div>

              </div>

            </div>

            <div className="progress mt-4">

              <div
                className="progress-bar progress-bar-striped"
                style={{
                  width: `${result.overallScore}%`
                }}
              >
                {result.overallScore}%
              </div>

            </div>

          </div>

        </div>

        <h2 className="mb-4">
          Detailed Feedback
        </h2>

        {result.answers?.map((item, index) => (

          <div
            key={index}
            className="card shadow-sm border-0 mb-4"
          >

            <div className="card-body">

              <h4 className="fw-bold">
                Question {index + 1}
              </h4>

              <hr />

              <h6>Question</h6>
              <p>{item.question}</p>

              <h6>Your Answer</h6>
              <p>{item.answer}</p>

              <div className="alert alert-info">

                <strong>Score:</strong>{" "}
                {item.score}

              </div>

              <div className="alert alert-secondary">

                <strong>Feedback:</strong>

                <br />

                {item.feedback}

              </div>

            </div>

          </div>

        ))}

        <div className="text-center mt-4 mb-5">

          <button
            className="btn btn-success me-3"
            onClick={() =>
              navigate("/interview/start")
            }
          >
            Take Another Interview
          </button>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Back to Dashboard
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Result;