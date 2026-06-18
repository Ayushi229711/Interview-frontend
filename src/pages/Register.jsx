import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {

    try {

      setLoading(true);

      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Registration Failed");

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
                Create Account
              </h1>

              <p className="text-center text-muted mb-4">
                Join AI Interview Prep
              </p>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                className="btn btn-success w-100"
                onClick={register}
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Register"}
              </button>

              <p className="text-center mt-3">

                Already have an account?{" "}

                <Link to="/login">
                  Login Here
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

export default Register;