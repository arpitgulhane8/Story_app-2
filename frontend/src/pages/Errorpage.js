import React from "react";
import "../styles/errorpage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">
        <i className="fas fa-exclamation-triangle"></i> 404
      </h1>
      <i className="fas fa-sad-cry"></i>
      <p className="not-found-text">
        Sorry, the page you're looking for cannot be found.
      </p>
      <a href="/" className="home-link">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
