const Story = require("../Model/Story_model");
const User = require("../Model/User_model");

exports.createStory = async (req, res) => {
  try {
    const { category, slides } = req.body;
    console.log(category);
    const userId = req.user._id;

    console.log(userId);

    const updatedSlides = slides.map((slide) => {
      return {
        heading: slide.heading,
        description: slide.description,
        media: slide.media,
      };
    });

    const newStory = new Story({
      user: userId,
      category,
      slides: updatedSlides,
    });

    await newStory.save();
    await User.findByIdAndUpdate(userId, {
      $push: { storyCreated: newStory._id },
    });

    res.status(201).json({
      message: "Story created successfully",
      story: newStory,
    });
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
    console.log(stories);

    res.status(200).json({
      count: stories.length,
      data: stories,
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getUserStories = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("storyCreated");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ stories: user.storyCreated });
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getUserBookmarkStories = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("bookmarks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ Bookmark: user.bookmarks });
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const story = await Story.findById(req.params.storyId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (user.likedStories.includes(story._id)) {
      user.likedStories = user.likedStories.filter(
        (id) => id.toString() !== story._id.toString()
      );
      story.likes = Math.max(0, story.likes - 1);
    } else {
      user.likedStories.push(story._id);
      story.likes++;
    }

    await user.save();
    await story.save();

    console.log(story.likes);
    res.status(201).json({
      message: "Like status updated",
      likescounts: story.likes,
      likes: user.likedStories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

exports.toggleBookmark = async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    const populatedUser = await User.findById(userId).populate("bookmarks");
    res.status(200).json({
      message: isBookmarked ? "Bookmark removed" : "Story bookmarked",
      bookmarks: populatedUser.bookmarks,
    });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getUserlikeStories = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ likes: user.likedStories });
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.editStory = async (req, res) => {
  const { storyId } = req.params;
  const { category, slides } = req.body;

  try {
    let story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (story.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to edit this story" });
    }

    story.category = category || story.category;
    story.slides = slides || story.slides;

    const updatedStory = await story.save();

    return res
      .status(200)
      .json({ message: "Story updated successfully", updatedStory });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.shareStorydata = async (req, res) => {
  try {
    console.log(req.params.storyId);
    const story = await Story.findById(req.params.storyId);
    if (!story) return res.status(404).send("Story not found");
    return res.status(201).json({ story });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
