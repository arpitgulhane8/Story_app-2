require("dotenv").config();
const connectDB = require("./db/index.js");
const app = require("./app.js");
const authRoutes = require("./Routes/auth/index.js");
const story = require("./Routes/story/index.js")



//connection with DB
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR:", error);
      throw error;
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB CONNECTION FAIL !!", err);
  });


  app.use("/api/auth", authRoutes);

  app.use("/api/story",story);
  