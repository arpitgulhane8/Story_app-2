import React, { useState, useEffect } from "react";
import "../styles/Storycard.css";
import VideoPlayer from "./Video";
import StoryDetails21 from "./StoryDetails";

const StoryCard = ({ story }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isStoryDetailsOpen, setStoryDetailsOpen] = useState(false);

  const { slides = [] } = story || {};

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  const currentSlide = slides[currentSlideIndex] || null;

  if (!currentSlide) {
    return <div>No slides available.</div>;
  }

  return (
    <>
      <div className="storyCard" onClick={() => setStoryDetailsOpen(true)}>
        <div className="storyCard-media">
          {currentSlide.media.type === "photo" ? (
            <img
              src={currentSlide.media.url}
              alt={currentSlide.heading}
              aria-label={currentSlide.heading}
            />
          ) : (
            <VideoPlayer
              videoUrl={currentSlide.media.url}
              muted
              loop
              playsInline
            />
          )}
        </div>
        <div className="storyCard-info">
          <h3>{currentSlide.heading}</h3>
          <p>{currentSlide.description}</p>
        </div>
      </div>

      {isStoryDetailsOpen && (
        <StoryDetails21
          close={() => setStoryDetailsOpen(false)}
          storyP={story}
        />
      )}
    </>
  );
};

export default StoryCard;
