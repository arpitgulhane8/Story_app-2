import axios from "axios";

const API_URL = 'http://localhost:5000/api';

export const fetchStories = async () => {
  try {
    const response = await axios.get(`${API_URL}/story/getallstories`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch stories");
  }
};

export const addStory = async (storyData, token) => {
  try {
    
    const response = await axios.post(
      `${API_URL}/story/createStory`,
      storyData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding story:", error);
    throw new Error(error.response?.data?.message || "Failed to add story");
  }
};

export const toggleLikeApi = async (storyId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/story/${storyId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error(
      "Error liking the story:",
      error.response?.data.message || error.message
    );
    throw new Error(error.response?.data.message || error.message);
  }
};

export const bookmarkStory = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/story/getBookmarks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.Bookmark;
  } catch (error) {
    console.error("Error saving story:", error);
    throw new Error(error.response?.data?.message || "Failed to save story");
  }
};

export const shareStory = async (storyId) => {
  try {
   
    const response = await axios.get(`${API_URL}/story/${storyId}/share`);
    
    return response.data.story;
  } catch (error) {
    console.error("Error sharing story:", error);
    throw new Error(error.response?.data?.message || "Failed to share story");
  }
};

export const getUserStories = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/story/getUserStories`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.stories;
  } catch (error) {
    console.log("ERROR IN GETTING YOUR STORIES");
    throw new Error(
      error.response?.data?.message || "Failed to get Your story"
    );
  }
};

export const toggleBookmarkApi = async (storyId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/story/${storyId}/bookmark`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || error.message);
  }
};

export const getLikedStory = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/story/getUserlikeStories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error saving story:", error);
    throw new Error(error.response?.data?.message || "Failed to save story");
  }
};

export const updateStoryApi = async (storyData, token, storyId) => {
  try {
    
    const response = await axios.post(
      `${API_URL}/story/${storyId}/edit`,
      storyData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
