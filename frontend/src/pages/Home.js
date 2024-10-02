import React, { useState, useEffect } from "react";
import StoryCard from "../components/Storycard";
import "../styles/Home.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchStoriesAction } from "../redux/actions/storyAction";
import Yourcode from "../components/Yourcode";

const categoryImages = {
  All: "/all.jpeg",
  Medical: "/Medical.jpeg",
  Fruits: "/fruits.jpeg",
  World: "/world.jpeg",
  India: "/india.jpeg",
  "Health and Fitness": "/h&t.jpeg",
  Travel: "/travel.jpeg",
  Movies: "/movies.jpeg",
  Education: "/education.jpeg",
  Food: "/food.jpeg",
};

const Home = () => {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.story);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const categories = Object.keys(categoryImages);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleStoriesCount, setVisibleStoriesCount] = useState({});
  const [groupedStories, setGroupedStories] = useState({});

  useEffect(() => {
    dispatch(fetchStoriesAction());
  }, [dispatch]);

  useEffect(() => {
    if (stories && stories.length > 0) {
      const grouped = stories.reduce((acc, story) => {
        const { category } = story;
        if (!acc[category]) acc[category] = [];
        acc[category].push(story);
        return acc;
      }, {});

      const initialVisibleCount = Object.keys(grouped).reduce(
        (acc, category) => {
          acc[category] = 4;
          return acc;
        },
        {}
      );

      setGroupedStories(grouped);
      setVisibleStoriesCount(initialVisibleCount);
    }
  }, [stories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSeeMoreClick = (category) => {
    setVisibleStoriesCount((prevCounts) => ({
      ...prevCounts,
      [category]: prevCounts[category] + 4,
    }));
  };

  const getVisibleStories = (category) => {
    if (category === "All") {
      return Object.keys(groupedStories).map((categories) => (
        <div key={categories} className="home_percatagory">
          <h2>Top Stories in {categories}</h2>
          <div className="home_percatagory_container">
            {groupedStories[categories].length === 0 ? (
              <h4>No stories available in this category.</h4>
            ) : (
              <>
                {groupedStories[categories]
                  .slice(0, visibleStoriesCount[categories])
                  .map((story) => (
                    <div
                      key={story._id}
                      style={{ margin: "10px 0px" }}
                      className="home_storyCard"
                    >
                      <StoryCard story={story} />
                    </div>
                  ))}
              </>
            )}
          </div>
          {groupedStories[categories].length >
            visibleStoriesCount[categories] && (
            <div className="show-more-container" style={{ margin: "20px 0px" }}>
              <button
                className="show-more-btn"
                onClick={() => handleSeeMoreClick(categories)}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      ));
    } else {
      const filteredStories = groupedStories[category] || [];
      return (
        <div className="home_percatagory">
          <div className="home_percatagory_container">
            {filteredStories.length === 0 ? (
              <h4>No stories available in this category.</h4>
            ) : (
              <>
                {filteredStories
                  .slice(0, visibleStoriesCount[category])
                  .map((story) => (
                    <div key={story._id}>
                      <StoryCard story={story} className="home_storyCard" />
                    </div>
                  ))}
              </>
            )}
          </div>
          {filteredStories.length > visibleStoriesCount[category] && (
            <div className="show-more-container" style={{ margin: "20px 0px" }}>
              <button
                className="show-more-btn"
                onClick={() => handleSeeMoreClick(category)}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="home-container">
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
            style={{
              backgroundImage: `url(${categoryImages[category]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="stories-section">
        {isAuthenticated && selectedCategory === "All" && <Yourcode />}

        {selectedCategory === "All" ? (
          <></>
        ) : (
          <h2>Top Stories in {selectedCategory}</h2>
        )}

        {getVisibleStories(selectedCategory)}
      </div>
    </div>
  );
};

export default Home;
