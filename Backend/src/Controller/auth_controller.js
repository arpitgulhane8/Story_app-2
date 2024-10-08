const bcrypt = require("bcrypt");
const User = require("../Model/User_model.js");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    const token = newUser.generateAccessToken();

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser.username,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};

//Existing user login controller
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "Wrong Email or Password" });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Wrong Email or Password" });
    } else {
      const token = existingUser.generateAccessToken();

      res.status(201).json({
        message: "Login successfully",
        token,
        user: existingUser.username,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getUser = (req, res) => {
  try {
    console.log(req.user.username);
    const user = req.user.username;
    const token = req.token;
    console.log(token);
    res.status(201).json({
      user: user,
      token: token,
    });
  } catch (err) {
    console.error("Error retrieving user info:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
