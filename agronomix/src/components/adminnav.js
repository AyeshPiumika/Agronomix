import React from "react";

import "bootstrap/js/dist/dropdown";

import "bootstrap/js/dist/collapse";
import { Link } from "react-router-dom";

function AdminNav({ Toggle }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Yousof
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <Link to="/manageUsers" className="dropdown-item" href="#">
                Users
              </Link>
              <Link
                to="/managearticlegallery"
                className="dropdown-item"
                href="#"
              >
                Articles
              </Link>
              <Link
                to="/managemotivationalcontent"
                className="dropdown-item"
                href="#"
              >
                Motivational Contents
              </Link>
              <Link to="/managevideogallery" className="dropdown-item" href="#">
                Videos
              </Link>
              <Link to="/adminlogin" className="dropdown-item" href="#">
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default AdminNav;
