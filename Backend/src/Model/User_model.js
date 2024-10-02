const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    storyCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    likedStories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.TOKEN_SECRET
  );
};

module.exports = mongoose.model("User", userSchema);
