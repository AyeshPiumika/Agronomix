import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase-config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage("Please enter your registered email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      setMessage("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Forgot Password</h2>
              <p className="card-text">
                Enter your registered email address to reset your password.
              </p>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="btn btn-success" onClick={handlePasswordReset}>
                Reset Password
              </button>
              {message && <p className="mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
