import React, { useState, useEffect } from "react";
import "../styles/createsory.css";
import { addStoryAction, updateStoryAction } from "../redux/actions/storyAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const StoryForm = ({ close, story }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Initialize with at least 3 empty slides
  const [slides, setSlides] = useState([
    { heading: "", description: "", media: { url: "", type: "" } },
    { heading: "", description: "", media: { url: "", type: "" } },
    { heading: "", description: "", media: { url: "", type: "" } },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (story) {
      setSlides(story.slides);
      setCategory(story.category);
    }
  }, [story]);

  const addSlide = () => {
    if (slides.length < 6) {
      setSlides([
        ...slides,
        { heading: "", description: "", media: { url: "", type: "" } },
      ]);
    }
  };

  const removeSlide = (index) => {
    if (slides.length <= 3) {
      toast.error("You must have at least 3 slides.");
      return;
    }
    setSlides((prevSlides) => prevSlides.filter((_, i) => i !== index));
    if (currentSlide >= slides.length - 1 && slides.length > 1) {
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  const changeSlide = (index) => {
    setCurrentSlide(index);
  };

  const detectMediaType = async (url) => {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;
    const extension = path.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
      return "photo";
    } else if (
      ["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(extension) ||
      /youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|facebook\.com|tiktok\.com/.test(url)
    ) {
      return "video";
    }

    return await getMediaType(url);
  };

  const getMediaType = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const type = blob.type;

      if (type.startsWith("video/")) return "video";
      if (type.startsWith("image/")) return "photo";

      return null;
    } catch (error) {
      console.error("Error fetching media type:", error);
      return null;
    }
  };

  const handleMediaUrlChange = async (e) => {
    const url = e.target.value;

    try {
      const mediaType = await detectMediaType(url);

      if (!mediaType) {
        toast.error("Invalid URL or unsupported media type");
        return;
      }

      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides[currentSlide] = {
          ...updatedSlides[currentSlide],
          media: {
            ...updatedSlides[currentSlide].media,
            url,
            type: mediaType,
          },
        };
        return updatedSlides;
      });
    } catch (error) {
      toast.error("Error while detecting media type");
      console.error("Error in handleMediaUrlChange:", error);
    }
  };

  const handleSlideChange = (field, value) => {
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      updatedSlides[currentSlide] = {
        ...updatedSlides[currentSlide],
        [field]: value,
      };
      return updatedSlides;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storyData = {
      slides,
      category,
    };

    try {
      if (story) {
        dispatch(updateStoryAction(storyData, token, story._id));
      } else {
        dispatch(addStoryAction(storyData, token));
      }
      close();
    } catch (error) {
      console.error("Error saving story:", error);
    }
  };

  return (
    <div className="story-form-container">
      <div className="slides-nav">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            onClick={() => changeSlide(index)}
          >
            Slide {index + 1}
            {index !== 0 && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeSlide(index);
                }}
                className="remove-slide"
              >
                ⓧ
              </span>
            )}
          </div>
        ))}
        {slides.length < 6 && (
          <div className="slide-add" onClick={addSlide}>
            Add +
          </div>
        )}
        <div className="close-btn" onClick={close}>
          ⓧ
        </div>
      </div>

      <form className="story-form" onSubmit={handleSubmit}>
        <div className="slide-content">
          <div className="slide-content-item">
            <label>Heading:</label>
            <input
              type="text"
              value={slides[currentSlide].heading}
              placeholder="Your heading"
              onChange={(e) => handleSlideChange("heading", e.target.value)}
              required
            />
          </div>
          <div className="slide-content-item">
            <label>Image & Video:</label>
            <input
              type="text"
              value={slides[currentSlide].media.url}
              placeholder="Image & Video URL"
              onChange={handleMediaUrlChange}
              required
            />
          </div>
          <div className="slide-content-item">
            <label>Description:</label>
            <textarea
              value={slides[currentSlide].description}
              placeholder="Story Description"
              onChange={(e) => handleSlideChange("description", e.target.value)}
              required
            />
          </div>
          <div className="slide-content-item">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option>Select category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Health and Fitness">Health and Fitness</option>
              <option value="Medical">Medical</option>
              <option value="Education">Education</option>
              <option value="Movies">Movies</option>
              <option value="India">India</option>
              <option value="World">World</option>
              <option value="Fruits">Fruits</option>
            </select>
          </div>
        </div>

        <div className="form-footer">
          <div className="button-group">
            <button
              type="button"
              className="prev-btn"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={() =>
                setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))
              }
            >
              Next
            </button>
          </div>
          <button type="submit" className="post-btn">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryForm;
