import { toast } from "react-toastify";
import {
  fetchStories,
  addStory,
  toggleLikeApi,
  bookmarkStory,
  shareStory,
  getUserStories,
  toggleBookmarkApi,
  getLikedStory,
  updateStoryApi,
} from "../../api/storyApi";

export const fetchStoriesAction = () => async (dispatch) => {
  try {
    const stories = await fetchStories();

    dispatch({
      type: "FETCH_STORIES_SUCCESS",
      payload: stories,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_STORIES_FAIL",
      payload: error.response.data,
    });
  }
};

export const addStoryAction = (storyData, token) => async (dispatch) => {
  try {
    console.log(storyData);
    const newStory = await addStory(storyData, token);
    dispatch({
      type: "ADD_STORY_SUCCESS",
      payload: newStory.story,
    });
    toast.success(newStory.message);
  } catch (error) {
    dispatch({
      type: "ADD_STORY_FAIL",
      payload: error.response?.data || "Error adding story",
    });
    toast.error("Failed to add the story.");
  }
};

export const bookmarkStoryAction = (token) => async (dispatch) => {
  try {
    const bookmarks = await bookmarkStory(token);
    dispatch({
      type: "BOOKMARK_STORY_SUCCESS",
      payload: bookmarks,
    });
  } catch (error) {
    dispatch({
      type: "BOOKMARK_STORY_FAIL",
      payload: error.response?.data || "Error fetching bookmarks",
    });
  }
};

export const shareStoryAction = (storyId) => async (dispatch) => {
  try {
    const data = await shareStory(storyId);
    console.log(data);
    dispatch({
      type: "SHARE_STORY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SHARE_STORY_FAIL",
      payload: error.response.data,
    });
  }
};

export const getUserStoriesAction = (token) => async (dispatch) => {
  try {
    const stories = await getUserStories(token);
    dispatch({
      type: "GETUSERSTORY_SUCCESS",
      payload: stories,
    });
  } catch (error) {
    dispatch({
      type: "GETUSERSTORY_FAIL",
      payload: error.response.data,
    });
  }
};

export const toggleBookmark =
  (storyId, token) => async (dispatch, getState) => {
    try {
      const data = await toggleBookmarkApi(storyId, token);

      dispatch({
        type: "TOGGLE_BOOKMARK_SUCCESS",
        payload: data.bookmarks,
      });
    } catch (error) {
      dispatch({
        type: "TOGGLE_BOOKMARK_FAIL",
        payload: error.message,
      });
    }
  };

export const toggleLike = (storyId, token) => async (dispatch) => {
  try {
    const data = await toggleLikeApi(storyId, token);
    console.log(storyId);
    dispatch({ type: "TOGGLE_LIKE_SUCCESS", storyId, payload: data });
  } catch (error) {
    dispatch({ type: "TOGGLE_LIKE_FAILURE", payload: error.message });
  }
};

export const getUserlikeStories = (token) => async (dispatch) => {
  try {
    const stories = await getLikedStory(token);
    dispatch({
      type: "GETUSERLIEKESTORY_SUCCESS",
      payload: stories,
    });
  } catch (error) {
    dispatch({
      type: "GETUSERLIKESTORY_FAIL",
      payload: error.response.data,
    });
  }
};

export const updateStoryAction =
  (storyData, token, storyId) => async (dispatch) => {
    try {
      const data = await updateStoryApi(storyData, token, storyId);
      toast.success(data.message);
      dispatch({ type: "UPDATE_STORY_SUCCESS", payload: data.updatedStory });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "UPDATE_STORY_FAIL", payload: error.message });
    }
  };
