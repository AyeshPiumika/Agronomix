import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  // const openFlaskProjectInNewTab = () => {
  //   // Open the Flask project URL in a new tab
  //   window.open("http://127.0.0.1:8080/", "_blank");
  // };

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="./Agronomix.svg" alt="Bootstrap" width="100" height="50" />
        </a>
      </div>
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/" class="nav-link active" aria-current="page" href="#">
                Home
              </Link>
            </li>
            <li class="nav-item">
              {/* <a class="nav-link" href="#" onClick={openFlaskProjectInNewTab}>
                Predicting System
              </a> */}
              <Link to="/login" class="nav-link">
                Predicting System
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/articlegallery" className="nav-link">
                Articles
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/motivationalgallery" className="nav-link">
                Motivational Articles
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/videogallery" className="nav-link">
                Videos
              </Link>
            </li>
            <li class="nav-item">
              {
                /* <a class="nav-link" href="#">
                Sign in
              </a> */
                <Link to="/login" className="nav-link">
                  Sign In
                </Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
