import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// import Navbar from "./navbar";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if the provided email and password match the correct credentials
    const correctEmail = "adminuser@gmail.com";
    const correctPassword = "Admin@Manage#123";

    if (email === correctEmail && password === correctPassword) {
      // Redirect to the admin dashboard upon successful login
      navigate("/admindashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <section className="vh-100">
      {/* <Navbar /> */}
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://img.freepik.com/free-vector/man-watering-plants-garden-white-background_1308-71208.jpg?w=996&t=st=1695798954~exp=1695799554~hmac=1ce3b0f5a2604839777c105a6c1b7047435428be9b79585dea750032a5f753ad"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleLogin}>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
