const express = require("express");
const router = express.Router();
const {
  createStory,
  getAllStories,
  getUserStories,
  getUserBookmarkStories,
  toggleLike,
  toggleBookmark,
  getUserlikeStories,
  editStory,
  shareStorydata,
} = require("../../Controller/story_controller");
const authMiddleware = require("../../Middleware/auth.js");

// Register route
router.post("/createStory", authMiddleware, createStory);
router.get("/getallstories", getAllStories);
router.get("/getUserStories", authMiddleware, getUserStories);
router.get("/getUserlikeStories", authMiddleware, getUserlikeStories);
router.get("/getBookmarks", authMiddleware, getUserBookmarkStories);
router.put("/:storyId/like", authMiddleware, toggleLike);
router.put("/:storyId/bookmark", authMiddleware, toggleBookmark);
router.post("/:storyId/edit", authMiddleware, editStory);
router.get("/:storyId/share", shareStorydata);

module.exports = router;
