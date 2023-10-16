import React from "react";
import Sidebar from "./sidebar";
import DashboardHome from "./dashboardhome";
import { useState } from "react";

import "./sidebar.css";

function AdminDashboard() {
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-2 bg-white vh-100">
            <Sidebar />
          </div>
        )}
        <div className="col">
          <DashboardHome Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
