const initialState = {
  stories: [],
  error: null,
  bookmarks: [],
  yourstories: [],
  likes: [],
  loading: true,
  getSharestory: null,
};

const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STORIES_SUCCESS":
      return {
        ...state,
        stories: action.payload,
        loading: false,
      };
    case "FETCH_STORIES_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    case "GETUSERLIEKESTORY_SUCCESS":
      return {
        ...state,
        likes: action.payload.likes,
      };

    case "ADD_STORY_SUCCESS":
      return {
        ...state,
        stories: [...state.stories, action.payload],
        yourstories: [...state.yourstories, action.payload],
      };
    case "ADD_STORY_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    case "BOOKMARK_STORY_SUCCESS":
      return {
        ...state,
        bookmarks: action.payload,
      };
    case "BOOKMARK_STORY_FAIL":
      return {
        ...state,
        error: action.payload || "Failed to bookmark the story",
      };

    case "GETUSERSTORY_SUCCESS":
      return {
        ...state,
        yourstories: action.payload,
      };
    case "GETUSERSTORY_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    case "TOGGLE_BOOKMARK_SUCCESS":
      return {
        ...state,
        bookmarks: action.payload,
      };
    case "TOGGLE_BOOKMARK_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    case "TOGGLE_LIKE_SUCCESS":
      console.log(action.storyId);
      return {
        ...state,
        likes: action.payload.likes,
        stories: state.stories.map((story) =>
          story._id === action.storyId
            ? { ...story, likes: action.payload.likescounts }
            : story
        ),
        yourstories: state.yourstories.map((story) =>
          story._id === action.storyId
            ? { ...story, likes: action.payload.likescounts }
            : story
        ),
      };

    case "UPDATE_STORY_SUCCESS":
      return {
        ...state,
        stories: state.stories.map((story) =>
          story._id === action.payload._id ? action.payload : story
        ),
        yourstories: state.yourstories.map((story) =>
          story._id === action.payload._id ? action.payload : story
        ),
        error: null,
      };
    case "UPDATE_STORY_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "SHARE_STORY_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        getSharestory: action.payload,
        loading: false,
        error: null,
      };
    case "SHARE_STORY_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default storyReducer;
