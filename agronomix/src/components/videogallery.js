import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "./navbar";
import Footer from "./footer";

function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch videos from Firestore
    const fetchVideos = async () => {
      const videoData = [];
      let q;

      if (searchQuery) {
        // If there is a search query, filter videos by title
        q = query(collection(db, "videos"), where("title", ">=", searchQuery));
      } else {
        // If no search query, fetch all videos
        q = query(collection(db, "videos"));
      }

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        videoData.push({ id: doc.id, ...doc.data() });
      });

      setVideos(videoData);
    };

    fetchVideos();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      <img
        src="/videogallery.png"
        alt="Banner"
        style={{ width: "100%", maxHeight: "875px" }}
      />{" "}
      <div className="container mt-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />{" "}
        </div>{" "}
        <div className="row">
          {" "}
          {videos.map((video) => (
            <div className="col-md-4 mb-4" key={video.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"> {video.title} </h5>{" "}
                  <p className="card-text"> {video.description} </p>{" "}
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.videoLink}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <Footer />
    </div>
  );
}

export default VideoGallery;
