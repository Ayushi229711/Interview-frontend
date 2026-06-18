import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Interview() {

  const { sessionId } = useParams();
  console.log("SESSION ID =", sessionId);

  const navigate = useNavigate();

  const questions =
    JSON.parse(localStorage.getItem("questions")) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentIndex];

  const submitAnswer = async () => {

    if (!answer.trim()) {
      alert("Please enter an answer");
      return;
    }

    try {

      setLoading(true);

      await API.post("/interview/answer", {
        sessionId: Number(sessionId),
        questionId: currentQuestion.id,
        answerText: answer
      });

      setAnswer("");

      if (currentIndex < questions.length - 1) {

        setCurrentIndex(currentIndex + 1);

      } else {

        console.log(
          "Navigating to:",
          `/interview/result/${sessionId}`
        );

        console.log(
          "SESSION ID =",
          sessionId
        );

        navigate(
          `/interview/result/${sessionId}`
        );
      }

    } catch (err) {

      console.log(err);
      alert("Failed to submit answer");

    } finally {

      setLoading(false);
    }
  };

  if (!currentQuestion) {

    return (
      <>
        <Navbar />

        <div className="container mt-5">

          <div className="alert alert-warning">
            No Questions Found
          </div>

        </div>

        <Footer />
      </>
    );
  }

  const progress =
    ((currentIndex + 1) / questions.length) * 100;

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-8">

            <div className="card shadow-lg border-0">

              <div className="card-body p-5">

                <h2 className="fw-bold text-center mb-4">
                  AI Interview
                </h2>

                <div className="mb-4">

                  <div className="d-flex justify-content-between">

                    <span>
                      Question {currentIndex + 1}
                    </span>

                    <span>
                      {questions.length} Total
                    </span>

                  </div>

                  <div className="progress mt-2">

                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${progress}%`
                      }}
                    >
                      {Math.round(progress)}%
                    </div>

                  </div>

                </div>

                <div className="card bg-light border-0 mb-4">

                  <div className="card-body">

                    <h5 className="fw-bold">
                      Interview Question
                    </h5>

                    <p className="mb-0">
                      {currentQuestion.questionText}
                    </p>

                  </div>

                </div>

                <div className="mb-4">

                  <label className="form-label fw-bold">
                    Your Answer
                  </label>

                  <textarea
                    className="form-control"
                    rows="8"
                    value={answer}
                    onChange={(e) =>
                      setAnswer(e.target.value)
                    }
                    placeholder="Write your answer here..."
                  />

                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={submitAnswer}
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : currentIndex === questions.length - 1
                    ? "Finish Interview"
                    : "Next Question"}
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

export default Interview;