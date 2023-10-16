import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home.js";
import Login from "./components/login";
import Signup from "./components/signup.js";
import ForgotPassword from "./components/forgotpassword.js";
import ArticleGallery from "./components/articlegallery";
import VideoGallery from "./components/videogallery";
import ManageVideoGallery from "./components/managevideogallery";
import ManageArticleGallery from "./components/managearticlegallery";
import AdminLogin from "./components/adminlogin";
import ManageUsers from "./components/manageUsers";
import AdminDashboard from "./components/admindashboard.js";
import ManageMotivationalContent from "./components/managemotivationalcontent.js";
import MotivationalArticleGallery from "./components/motivationalgallery.js";
import "bootstrap-icons/font/bootstrap-icons.css";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/articlegallery" element={<ArticleGallery />} />
          <Route path="/videogallery" element={<VideoGallery />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route
            path="/managearticlegallery"
            element={<ManageArticleGallery />}
          />
          <Route path="/managevideogallery" element={<ManageVideoGallery />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route
            path="/managemotivationalcontent"
            element={<ManageMotivationalContent />}
          />
          <Route
            path="/motivationalgallery"
            element={<MotivationalArticleGallery />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

// function App() {
//   return (
//     <div>
//       <AdminDashboard />
//     </div>
//   );
// }

export default App;
