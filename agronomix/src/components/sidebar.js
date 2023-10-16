import React from "react";
import { Link } from "react-router-dom";

import "./sidebar.css";

function Sidebar() {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <i className="bi bi-person-circlebi bi-person-circle me-3 fs-4"> </i>
        <span className="brand-name fs-4"> Admin Dashboard </span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <a className="list-group-item py-2">
          <i className="bi bi-speedometer2 fs-5 me-3"> </i>
          <span> Dashboard Home </span>
        </a>
        <Link to="/manageUsers" className="list-group-item py-2 ">
          <i className="bi bi-people-fill fs-5 me-3"> </i> <span>Users</span>
        </Link>
        <Link to="/managevideogallery" className="list-group-item py-2">
          <i className="bi bi-file-earmark-play-fill fs-5 me-3"> </i>
          <span>Videos</span>
        </Link>
        <Link to="/managearticlegallery" className="list-group-item py-2">
          <i className="bi bi-file-text-fill fs-5 me-3"> </i>
          <span>Articles </span>
        </Link>
        <Link to="/managemotivationalcontent" className="list-group-item py-2">
          <i className="bi bi-file-text-fill fs-5 me-3"> </i>
          <span>Motivational Contents</span>
        </Link>
        <Link to="/adminlogin" className="list-group-item py-2">
          <i className="bi bi-power fs-5 me-3"> </i> <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
export default Sidebar;
