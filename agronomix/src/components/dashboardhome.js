import React, { useState, useEffect } from "react";
import AdminNav from "./adminnav";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function UserCount() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch the "users" collection and get the count of documents
    const fetchUserCount = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const count = querySnapshot.size; // Get the count of documents in the collection
      setUserCount(count);
    };

    fetchUserCount();
  }, []);

  return userCount; // Return the user count
}

function VideoCount() {
  const [VideoCount, setVideoCount] = useState(0);

  useEffect(() => {
    const fetchVideoCount = async () => {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const count = querySnapshot.size;
      setVideoCount(count);
    };

    fetchVideoCount();
  }, []);

  return VideoCount;
}

function ArticleCount() {
  const [ArticleCount, setArticleCount] = useState(0);

  useEffect(() => {
    const fetchArticleCount = async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const count = querySnapshot.size;
      setArticleCount(count);
    };

    fetchArticleCount();
  }, []);

  return ArticleCount;
}

function MotivationCount() {
  const [MotivationCount, setMotivationCount] = useState(0);

  useEffect(() => {
    const fetchMotivationCount = async () => {
      const querySnapshot = await getDocs(collection(db, "content"));
      const count = querySnapshot.size;
      setMotivationCount(count);
    };

    fetchMotivationCount();
  }, []);

  return MotivationCount;
}

function DashboardHome({ Toggle }) {
  const userCount = UserCount(); // Use the UserCount component to get the user count
  const videoCount = VideoCount();
  const articleCount = ArticleCount();
  const motivationCount = MotivationCount();

  return (
    <div className="px-3">
      <AdminNav Toggle={Toggle} />
      <div className="container-fluid">
        <div className="row g-3 my-2">
          <div className="col-md-3 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{userCount}</h3>
                <p className="fs-5">Total Users</p>
              </div>
              <i className="bi bi-people p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-3 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{videoCount}</h3>
                <p className="fs-5">Total Videos</p>
              </div>
              <i className="bi bi-file-play p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-3 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{articleCount}</h3>
                <p className="fs-5">Total Articles</p>
              </div>
              <i className="bi bi-file-text p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-3 p-1">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{motivationCount}</h3>
                <p className="fs-5">Total Motivational Articles</p>
              </div>
              <i className="bi bi-file-text p-3 fs-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardHome;
