import React, { useState } from "react";
import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [newName, setNewName] = useState("");
  const [newMail, setNewMail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newContactNO, setNewContactNO] = useState("");
  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    if (!newName || !newMail || !newPassword || !newContactNO) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Initialize Firebase Authentication
      const auth = getAuth();

      // Create a user with email and password
      await createUserWithEmailAndPassword(auth, newMail, newPassword);

      // Add user data to Firestore
      await addDoc(usersCollectionRef, {
        name: newName,
        email: newMail,
        password: newPassword,
        contactno: newContactNO,
      });

      setNewName("");
      setNewMail("");
      setNewPassword("");
      setNewContactNO("");
      alert("User registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error adding document: ", error.code, error.message);
      alert("Error registering user.");
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/sunny-meadow-landscape_1112-134.jpg?w=1380&t=st=1696918740~exp=1696919340~hmac=bf7bc738fe90d58a389d05e2458e5751c09c4511d5706acf3d7fcadde608746b')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Full Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={newMail}
                        onChange={(e) => setNewMail(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Your Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Contact Number"
                        value={newContactNO}
                        onChange={(e) => setNewContactNO(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        onClick={createUser}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/login" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
