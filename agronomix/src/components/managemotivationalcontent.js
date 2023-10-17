import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase-config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

const ManageMotivationalContent = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    // Fetch articles from Firestore
    const fetchArticles = async () => {
      const articleData = [];
      const querySnapshot = await getDocs(collection(db, "content"));
      querySnapshot.forEach((doc) => {
        articleData.push({ id: doc.id, ...doc.data() });
      });
      setArticles(articleData);
    };

    fetchArticles();
  }, []);

  const clearForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setSelectedArticle(null);
  };

  const validateForm = () => {
    if (!title || !content || !image) {
      setFormError("All fields are required.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Upload article image to Firebase Storage
    const imageRef = ref(storage, `article-images/${image.name}`);
    await uploadBytes(imageRef, image);

    // Get the download URL for the image
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "content"), {
      title,
      content,
      imageUrl,
    });

    clearForm();
  };

  const handleEditArticle = async () => {
    if (!selectedArticle) {
      return;
    }

    try {
      const articleRef = doc(db, "content", selectedArticle.id);

      await updateDoc(articleRef, {
        title,
        content,
      });

      setTitle("");
      setContent("");
      setSelectedArticle(null);
      alert("Article edited successfully!");
    } catch (error) {
      console.error("Error editing article: ", error);
      alert("Error editing article. Please try again.");
    }
  };

  const handleDeleteArticle = async (articleId) => {
    await deleteDoc(doc(db, "content", articleId));
  };

  const handleEditClick = async (articleId) => {
    const articleRef = doc(db, "content", articleId);
    const articleDoc = await getDoc(articleRef);

    if (articleDoc.exists()) {
      const data = articleDoc.data();
      setTitle(data.title);
      setContent(data.content);
      setSelectedArticle({ id: articleDoc.id });
    }
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
      <h1 className="text-center mt-4">Manage Motivational Content Gallery</h1>
      <div className="container mt-4">
        {/* Form for adding/editing articles */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={selectedArticle ? handleEditArticle : handleAddArticle}
            >
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Motivational Article Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  required
                  rows="4"
                  placeholder="Motivational Article Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="mb-3 text-danger">{formError}</div>
              <div className="mb-3">
                <button type="submit" className="btn btn-success">
                  {selectedArticle ? "Edit Article" : "Add Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        {/* Article gallery */}
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4 mb-4" key={article.id}>
              <div className="card">
                <img
                  src={article.imageUrl}
                  className="card-img-top"
                  style={{ height: "300px", width: "100%" }}
                  alt={article.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content}</p>
                  <div className="mt-3">
                    <button
                      onClick={() => handleEditClick(article.id)}
                      className="btn btn-success me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
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
};

export default ManageMotivationalContent;
