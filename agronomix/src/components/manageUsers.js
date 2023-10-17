import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import "bootstrap/js/dist/dropdown";

import "bootstrap/js/dist/collapse";
import { Link } from "react-router-dom";

function ManageUsers() {
  const [newName, setNewName] = useState("");
  const [newMail, setNewMail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newContactNO, setNewContactNO] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, {
  //     name: newName,
  //     email: newMail,
  //     password: newPassword,
  //     contactno: Number(newContactNO),
  //   });
  //   setNewName("");
  //   setNewMail("");
  //   setNewPassword("");
  //   setNewContactNO("");
  // };

  const clearFields = async () => {
    setNewName("");
    setNewMail("");
    setNewPassword("");
    setNewContactNO("");
  };

  const updateUser = async (id, name, email, password, contactno) => {
    const userDoc = doc(db, "users", id);
    const newFields = {
      name: name,
      email: email,
      password: password,
      contactno: contactno,
    };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollectionRef]);

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link to="/admindashboard" className="navbar-brand">
            Agronomix Administrator
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/manageUsers" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/managevideogallery" className="nav-link">
                  Videos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/managearticlegallery" className="nav-link">
                  Articles
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/managemotivationalcontent" className="nav-link">
                  Motivational Contents
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container" align="center">
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            <br />
            <h2 align="center">Create User</h2> <br />
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Name..."
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email..."
                onChange={(event) => {
                  setNewMail(event.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password..."
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Contact Number..."
                onChange={(event) => {
                  setNewContactNO(event.target.value);
                }}
                required
              />
            </div>
            {/* <button className="btn btn-success" onClick={createUser}>
            Create User
          </button> */}
            <button className="btn btn-secondary ms-2" onClick={clearFields}>
              Clear All
            </button>
          </div>
          <div className="col-md-6" align="center">
            <br />
            <h2>Registered Users</h2>
            <br />
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Contact Number</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.contactno}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => {
                          updateUser(
                            user.id,
                            newName,
                            newMail,
                            newPassword,
                            newContactNO // Keep it as a string for updates
                          );
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
