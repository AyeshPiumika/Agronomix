import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.open("http://127.0.0.1:8080/", "_blank");
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Invalid email or password.");
    }
  };

  return (
    <section className="vh-100">
      <br />
      <br />
      <br />
      <br />
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://img.freepik.com/free-vector/rice-field-concept-illustration_114360-12150.jpg?w=826&t=st=1696915744~exp=1696916344~hmac=14a62019f3fedc74b79da48da0047e942f9dc19421ed1f9c61213f12c804d22f"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              {/* <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-twitter"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div> */}

              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your registered email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label> */}
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control"
                  placeholder="Enter your registered password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <label className="form-label" htmlFor="form3Example4">
                  Password
                </label> */}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <Link to="/forgotpassword" href="#!" className="text-body">
                  Forgot password?
                </Link>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={handleSignIn}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to="/signup" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
