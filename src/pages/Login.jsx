import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {

    try {

      setLoading(true);

      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (err) {

      alert("Invalid Credentials");

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="row vh-100 align-items-center justify-content-center">

          <div className="col-md-5">

            <div className="card shadow-lg border-0 p-4">

              <h1 className="text-center fw-bold">
                AI Interview Prep
              </h1>

              <p className="text-center text-muted mb-4">
                Practice interviews powered by AI
              </p>

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                className="btn btn-primary w-100"
                onClick={login}
                disabled={loading}
              >
                {loading
                  ? "Logging In..."
                  : "Login"}
              </button>

              <p className="text-center mt-3">

                New User?{" "}

                <Link to="/register">
                  Register Here
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Login;