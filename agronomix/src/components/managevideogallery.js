import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import "./sidebar.css";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

function ManageVideoGallery() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch videos from Firestore
    const fetchVideos = async () => {
      const videoData = [];
      const q = query(collection(db, "videos"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        videoData.push({ id: doc.id, ...doc.data() });
      });
      setVideos(videoData);
    };

    fetchVideos();
  }, []);

  const handleAddVideo = async (e) => {
    e.preventDefault();

    if (!videoLink) {
      // Handle the case where no video link is provided
      return;
    }

    // Validate and extract the YouTube video ID
    const youtubeVideoId = getYoutubeVideoId(videoLink);

    if (!youtubeVideoId) {
      // Handle invalid YouTube URL
      alert("Invalid YouTube URL. Please provide a valid YouTube link.");
      return;
    }

    await addDoc(collection(db, "videos"), {
      title,
      description,
      videoLink: youtubeVideoId, // Store the YouTube video ID
      timestamp: serverTimestamp(),
    });

    setTitle("");
    setDescription("");
    setVideoLink(""); // Clear the videoLink state
  };

  const handleEditVideo = async () => {
    if (!selectedVideo) {
      return;
    }

    if (!videoLink) {
      // Handle the case where no video link is provided
      return;
    }

    // Validate and extract the YouTube video ID
    const youtubeVideoId = getYoutubeVideoId(videoLink);

    if (!youtubeVideoId) {
      // Handle invalid YouTube URL
      alert("Invalid YouTube URL. Please provide a valid YouTube link.");
      return;
    }

    const videoRef = doc(db, "videos", selectedVideo.id);

    await updateDoc(videoRef, {
      title,
      description,
      videoLink: youtubeVideoId, // Store the YouTube video ID
    });

    setTitle("");
    setDescription("");
    setVideoLink(""); // Clear the videoLink state
    setSelectedVideo(null);
  };

  const handleDeleteVideo = async (videoId) => {
    await deleteDoc(doc(db, "videos", videoId));
  };

  const handleViewVideo = (video) => {
    setSelectedVideo(video);
    setTitle(video.title);
    setDescription(video.description);
    setVideoLink(`https://www.youtube.com/embed/${video.videoLink}`);
  };

  // Helper function to extract the YouTube video ID from a URL
  const getYoutubeVideoId = (url) => {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match && match[1];
  };

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
      <h1 className="text-center mt-4">Manage Video Gallery</h1>
      <div className="container mt-4">
        {/* Form for adding/editing videos */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={selectedVideo ? handleEditVideo : handleAddVideo}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="YouTube Video Link"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-success">
                  {selectedVideo ? "Edit Video" : "Add Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        {/* Video gallery */}
        <div className="row">
          {videos.map((video) => (
            <div className="col-md-4 mb-4" key={video.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p className="card-text">{video.description}</p>
                  <iframe
                    width="100%"
                    height="200"
                    src={
                      videoLink ||
                      `https://www.youtube.com/embed/${video.videoLink}`
                    }
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div className="mt-3">
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageVideoGallery;
