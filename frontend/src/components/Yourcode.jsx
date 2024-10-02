import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserStoriesAction } from "../redux/actions/storyAction";
import StoryCard from "./Storycard";
import "../styles/yourcode.css";
import StoryForm from "./Createstory";

function Yourcode() {
  const dispatch = useDispatch();
  const { yourstories } = useSelector((state) => state.story);
  const { token } = useSelector((state) => state.auth);

  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getUserStoriesAction(token));
    }
  }, [dispatch, token]);

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 6);
  };

  const handleEdit = (story) => {
    setSelectedStory(story);
    setIsEditing(true);
  };

  return (
    <div className="yourcode">
      <h2>Your Stories</h2>
      <div className="yourcode_container">
        {!yourstories || yourstories.length === 0 ? (
          <p>You have not created any stories yet.</p>
        ) : (
          yourstories.slice(0, visibleCount).map((story) => (
            <div key={story._id} className="yourstory-section">
              <StoryCard story={story} />
              <div className="edit-button-container">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(story)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {visibleCount < yourstories.length && (
        <div className="show-more-container">
          <button className="show-more-btn" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
      {isEditing && (
        <div className="modal-overlay">
          <StoryForm story={selectedStory} close={() => setIsEditing(false)} />
        </div>
      )}
    </div>
  );
}

export default Yourcode;
