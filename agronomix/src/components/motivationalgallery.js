import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "./navbar";
import Footer from "./footer";

const MotivationalArticleGallery = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

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

  const handleSearch = () => {
    // Filter articles based on the search query
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setArticles(filteredArticles);
  };

  const openArticleModal = (article) => {
    setSelectedArticle(article);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div>
      <Navbar />
      <img
        src="/motivation.png"
        alt="Banner"
        style={{ width: "100%", maxHeight: "875px" }}
      />
      <div className="container mt-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button className="btn btn-success mt-2" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4 mb-4" key={article.id}>
              <div className="card">
                <img
                  src={article.imageUrl}
                  className="card-img-top"
                  // style={{ height: "250px", width: "100%" }}
                  alt={article.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">
                    {article.content.length > 100
                      ? `${article.content.slice(0, 100)}...`
                      : article.content}
                  </p>
                  <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#articleModal"
                    onClick={() => openArticleModal(article)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      {/* Modal for displaying the full article */}
      {selectedArticle && (
        <div
          className="modal fade"
          id="articleModal"
          tabIndex="-1"
          aria-labelledby="articleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="articleModalLabel">
                  {selectedArticle.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeArticleModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedArticle.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotivationalArticleGallery;
