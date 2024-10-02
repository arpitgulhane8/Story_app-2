import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/StoryDetails.css";
import VideoPlayer from "./Video";
import {
  toggleBookmark,
  toggleLike,
  shareStoryAction,
} from "../redux/actions/storyAction";
import Login from "../pages/Login";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const StoryDetails21 = ({ storyP, close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [instantFill, setInstantFill] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(shareStoryAction(id));
    }
  }, [id, dispatch]);

  const { getSharestory, bookmarks, likes, loading } = useSelector(
    (state) => state.story
  );
  const { token } = useSelector((state) => state.auth);

  const story = getSharestory || storyP;
  const storyDuration = 15000;
  const totalSlides = story?.slides.length || 0;

  const isBookmarked =
    token && bookmarks.some((bookmark) => bookmark._id === story?._id);
  const isLiked = token && likes.includes(story?._id);

  useEffect(() => {
    if (!isPaused && currentSlide < totalSlides) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
      }, storyDuration);

      return () => clearInterval(interval);
    }
  }, [isPaused, currentSlide, totalSlides]);

 

  const handleNext = () => {
    setInstantFill(false);
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setInstantFill(false);
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleLoginClose = () => setShowLogin(false);

  const handleLike = () => {
    if (!story || !story._id) return;
    if (token) {
      dispatch(toggleLike(story._id, token));
    } else {
      setShowLogin(true);
    }
  };

  const handleBookmark = () => {
    if (!story || !story._id) return;
    if (token) {
      dispatch(toggleBookmark(story._id, token));
    } else {
      setShowLogin(true);
    }
  };

  const handleShare = () => {
    if (!story || !story._id) return;
    if (token) {
      const shareableLink = `${window.location.origin}/stories/${story._id}`;
      navigator.clipboard
        .writeText(shareableLink)
        .then(() => {
          toast.success("Link copied to clipboard");
        })
        .catch(() => {
          toast.error("Failed to copy link");
        });
    } else {
      setShowLogin(true);
    }
  };

  const handleDownload = () => {
    const mediaUrl = story.slides[currentSlide]?.media.url;
    const link = document.createElement("a");
    link.href = mediaUrl;
    link.download = mediaUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloading...");

    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const handleClose = () => {
    if (getSharestory) {
      navigate("/");
    } else {
      close();
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX); 
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return; 

    const touchEnd = e.changedTouches[0].clientX; 
    const touchDiff = touchStart - touchEnd; 

    if (touchDiff > 50) {
      
      handleNext();
    } else if (touchDiff < -50) {
      
      handlePrevious();
    }

    setTouchStart(null); 
  };




  const currentMedia = story?.slides[currentSlide]?.media || {};
  const currentHeading = story?.slides[currentSlide]?.heading || "";
  const currentDescription = story?.slides[currentSlide]?.description || "";

  if (loading || !story) {
    return <div>Loading story...</div>;
  }

  return (
    <>
      <div className="storyCard-modaloverlay">
        <div className="storyCard-wraper">
        <button className="previous" onClick={handlePrevious}>
          <i className="fas fa-less-than"></i>
        </button>

         <div className="storyDetails-container" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div className="storyDetails-progress-bars">
            {story.slides.map((_, index) => (
              <div
                key={index}
                className={`storyDetails-progress-indicator ${
                  index < currentSlide ||
                  (index === currentSlide && instantFill)
                    ? "instant"
                    : ""
                } ${index <= currentSlide ? "active" : ""}`}
                style={{
                  animationDuration: `${storyDuration}ms`,
                  animationPlayState:
                    index === currentSlide && !instantFill
                      ? "running"
                      : "paused",
                }}
              />
            ))}
          </div>

          <button onClick={handleClose} className="storyDetails-close-button">
            <i className="fas fa-times"></i>
          </button>

          <button onClick={handleShare} className="storyDetails-share-button">
            <i className="far fa-paper-plane"></i>
          </button>

          <div className="storyDetails-content">
            <div className="storyDetails-media">
              {currentMedia.type === "video" ? (
                <VideoPlayer videoUrl={currentMedia.url} />
              ) : (
                <img src={currentMedia.url} alt={`Slide ${currentSlide + 1}`} />
              )}
            </div>
          </div>

          <div className="storyDetails-info">
            <h3>{currentHeading}</h3>
            <p>{currentDescription}</p>
          </div>

          <div className="storyDetails-buttons">
            <button
              onClick={handleBookmark}
              className={`storyDetails-bookmark-button ${
                isBookmarked ? "active" : ""
              }`}
            >
              <i
                className={isBookmarked ? "fas fa-bookmark" : "far fa-bookmark"}
              ></i>
            </button>

            {token && (
              <button
                onClick={handleDownload}
                className="storyDetails-download-button"
              >
                {isDownloading ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className="fas fa-download"></i>
                )}
              </button>
            )}

            <div className="storyDetails-like-section">
              <button
                onClick={handleLike}
                className={`storyDetails-like-button ${
                  isLiked ? "active" : ""
                }`}
              >
                <i
                  className={isLiked ? "fas fa-heart" : "far fa-heart"}
                  style={isLiked ? { color: "red" } : {}}
                ></i>{" "}
              </button>
              <span>
                {story.likes} {story.likes === 1 ? "Like" : "Likes"}
              </span>
            </div>
          </div>
          
        </div>

        <button className="next" onClick={handleNext}>
          <i className="fas fa-greater-than"></i>
        </button>
        </div>
      </div>

      <Modal show={showLogin} handleClose={handleLoginClose}>
        <Login handleClose={handleLoginClose} />
      </Modal>
    </>
  );
};

export default StoryDetails21;
