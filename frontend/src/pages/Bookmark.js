import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { bookmarkStoryAction } from "../redux/actions/storyAction";
import StoryCard from "../components/Storycard";
import "../styles/bookmark.css";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.story);
  const { token } = useSelector((state) => state.auth);

  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (token) {
      dispatch(bookmarkStoryAction(token));
    }
  }, [dispatch, token]);

  const handleShowMore = () => {
    setVisibleSlides((prevCount) => prevCount + 6);
  };

  return (
    <div className="bookmark">
      <div className="bookmar-stories-section">
        <h2>Your Bookmarked Stories</h2>
        <div className="bookmark-storycards-container">
          {!bookmarks || bookmarks.length === 0 ? (
            <p>No Bookmarked stories available</p>
          ) : (
            <>
              {bookmarks.slice(0, visibleSlides).map((story) => (
                <div key={story._id} className="bookmark_section">
                  <StoryCard story={story} />
                </div>
              ))}
            </>
          )}
        </div>
        {visibleSlides < bookmarks.length && (
          <button className="show-more-btn" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
